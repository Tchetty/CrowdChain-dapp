import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { parseEther } from '@/lib/format';
import { Plus, Trash2, Calendar } from 'lucide-react';

// Validation schema
const milestoneSchema = z.object({
  title: z.string().min(1, 'Milestone title is required'),
  amount: z.string().min(1, 'Amount is required').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Amount must be a valid positive number'
  )
});

const campaignSchema = z.object({
  title: z.string().min(1, 'Campaign title is required').max(100, 'Title too long'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(1000, 'Description too long'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  goal: z.string().min(1, 'Funding goal is required').refine(
    (val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0,
    'Goal must be a valid positive number'
  ),
  deadline: z.string().min(1, 'Deadline is required'),
  milestones: z.array(milestoneSchema).min(1, 'At least one milestone is required'),
  metadataUrl: z.string().url('Must be a valid URL').optional().or(z.literal(''))
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface CampaignFormProps {
  onSubmit: (data: CampaignFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const categories = [
  'DeFi', 'NFT', 'GameFi', 'Infrastructure', 'Security', 
  'SocialFi', 'Trading', 'Sustainability', 'Education', 'Other'
];

export function CampaignForm({ onSubmit, isSubmitting = false }: CampaignFormProps) {
  const [milestones, setMilestones] = useState([{ title: '', amount: '' }]);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      imageUrl: '',
      goal: '',
      deadline: '',
      milestones: [{ title: '', amount: '' }],
      metadataUrl: ''
    }
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch } = form;

  const watchedMilestones = watch('milestones');
  const watchedGoal = watch('goal');

  // Calculate total milestone amounts
  const totalMilestoneAmount = milestones.reduce((sum, milestone) => {
    return sum + (parseFloat(milestone.amount) || 0);
  }, 0);

  const goalAmount = parseFloat(watchedGoal) || 0;
  const milestoneTotalMatches = Math.abs(totalMilestoneAmount - goalAmount) < 0.001;

  const addMilestone = () => {
    const newMilestones = [...milestones, { title: '', amount: '' }];
    setMilestones(newMilestones);
    setValue('milestones', newMilestones);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length > 1) {
      const newMilestones = milestones.filter((_, i) => i !== index);
      setMilestones(newMilestones);
      setValue('milestones', newMilestones);
    }
  };

  const updateMilestone = (index: number, field: 'title' | 'amount', value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
    setValue('milestones', newMilestones);
  };

  const onSubmitForm = async (data: CampaignFormData) => {
    // Validate that milestone amounts equal goal
    if (!milestoneTotalMatches) {
      form.setError('milestones', {
        type: 'custom',
        message: 'Total milestone amounts must equal the funding goal'
      });
      return;
    }

    // Convert deadline to timestamp
    const deadlineTimestamp = new Date(data.deadline).getTime();
    if (deadlineTimestamp <= Date.now()) {
      form.setError('deadline', {
        type: 'custom',
        message: 'Deadline must be in the future'
      });
      return;
    }

    await onSubmit(data);
  };

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Campaign Title</Label>
            <Input
              id="title"
              {...register('title')}
              placeholder="Enter your campaign title"
              data-testid="input-campaign-title"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe your project in detail..."
              rows={4}
              data-testid="textarea-campaign-description"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                {...register('category')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                data-testid="select-campaign-category"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="imageUrl">Project Image URL (Optional)</Label>
              <Input
                id="imageUrl"
                type="url"
                {...register('imageUrl')}
                placeholder="https://example.com/image.jpg"
                data-testid="input-campaign-image"
              />
              {errors.imageUrl && (
                <p className="text-red-600 text-sm mt-1">{errors.imageUrl.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Funding Details */}
      <Card>
        <CardHeader>
          <CardTitle>Funding Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goal">Funding Goal (ETH)</Label>
              <Input
                id="goal"
                type="number"
                step="0.01"
                min="0"
                {...register('goal')}
                placeholder="10.0"
                data-testid="input-campaign-goal"
              />
              {errors.goal && (
                <p className="text-red-600 text-sm mt-1">{errors.goal.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="deadline">Campaign Deadline</Label>
              <Input
                id="deadline"
                type="date"
                min={minDate}
                {...register('deadline')}
                data-testid="input-campaign-deadline"
              />
              {errors.deadline && (
                <p className="text-red-600 text-sm mt-1">{errors.deadline.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="metadataUrl">Metadata URL (Optional)</Label>
            <Input
              id="metadataUrl"
              type="url"
              {...register('metadataUrl')}
              placeholder="https://ipfs.io/ipfs/your-metadata-hash"
              data-testid="input-campaign-metadata"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              IPFS or Arweave URL containing additional project details, documents, etc.
            </p>
            {errors.metadataUrl && (
              <p className="text-red-600 text-sm mt-1">{errors.metadataUrl.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Project Milestones</span>
            <div className="flex items-center space-x-2 text-sm">
              <span className={`${milestoneTotalMatches ? 'text-green-600' : 'text-red-600'}`}>
                Total: {totalMilestoneAmount.toFixed(3)} ETH
              </span>
              {goalAmount > 0 && (
                <Badge variant={milestoneTotalMatches ? 'default' : 'destructive'}>
                  {milestoneTotalMatches ? 'Matches Goal' : 'Must Equal Goal'}
                </Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Milestone {index + 1}</h4>
                {milestones.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeMilestone(index)}
                    data-testid={`button-remove-milestone-${index}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`milestone-title-${index}`}>Title</Label>
                  <Input
                    id={`milestone-title-${index}`}
                    value={milestone.title}
                    onChange={(e) => updateMilestone(index, 'title', e.target.value)}
                    placeholder="e.g., Smart Contract Development"
                    data-testid={`input-milestone-title-${index}`}
                  />
                </div>
                <div>
                  <Label htmlFor={`milestone-amount-${index}`}>Amount (ETH)</Label>
                  <Input
                    id={`milestone-amount-${index}`}
                    type="number"
                    step="0.01"
                    min="0"
                    value={milestone.amount}
                    onChange={(e) => updateMilestone(index, 'amount', e.target.value)}
                    placeholder="2.5"
                    data-testid={`input-milestone-amount-${index}`}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            onClick={addMilestone}
            className="w-full"
            data-testid="button-add-milestone"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Milestone
          </Button>

          {errors.milestones && (
            <p className="text-red-600 text-sm">{errors.milestones.message}</p>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          disabled={isSubmitting || !milestoneTotalMatches}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 font-semibold"
          data-testid="button-submit-campaign"
        >
          {isSubmitting ? 'Creating Campaign...' : 'Create Campaign'}
        </Button>
      </div>
    </form>
  );
}
