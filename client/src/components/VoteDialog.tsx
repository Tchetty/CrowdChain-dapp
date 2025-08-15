import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { Vote, CheckCircle, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  milestoneId?: string | null;
  proposalId?: string | null;
  campaignId?: string;
  title?: string;
  description?: string;
}

export function VoteDialog({ 
  isOpen, 
  onClose, 
  milestoneId, 
  proposalId, 
  campaignId,
  title,
  description 
}: VoteDialogProps) {
  const { isConnected } = useStore();
  const { toast } = useToast();
  const [voteType, setVoteType] = useState<'for' | 'against' | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to vote.',
        variant: 'destructive',
      });
      return;
    }

    if (!voteType) {
      toast({
        title: 'No Vote Selected',
        description: 'Please select whether you vote for or against.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In real app: call appropriate smart contract voting function
      if (milestoneId) {
        console.log('Voting on milestone:', { milestoneId, campaignId, vote: voteType, comment });
        // await contract.voteOnMilestone(campaignId, milestoneId, voteType === 'for', comment);
      } else if (proposalId) {
        console.log('Voting on proposal:', { proposalId, vote: voteType, comment });
        // await contract.voteOnProposal(proposalId, voteType === 'for', comment);
      }

      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: 'Vote Submitted',
        description: `Your ${voteType} vote has been recorded on the blockchain.`,
      });

      // Reset form and close
      setVoteType(null);
      setComment('');
      onClose();
    } catch (error) {
      toast({
        title: 'Vote Failed',
        description: 'There was an error submitting your vote. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setVoteType(null);
    setComment('');
    onClose();
  };

  const getDialogTitle = () => {
    if (milestoneId) return 'Vote on Milestone Release';
    if (proposalId) return 'Vote on Proposal';
    return title || 'Cast Your Vote';
  };

  const getDialogDescription = () => {
    if (milestoneId) return 'Vote to approve or reject the release of funds for this milestone.';
    if (proposalId) return 'Vote to support or oppose this governance proposal.';
    return description || 'Your vote will be recorded on the blockchain and cannot be changed.';
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-vote">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Vote className="w-5 h-5 text-primary" />
            <span>{getDialogTitle()}</span>
          </DialogTitle>
          <DialogDescription>
            {getDialogDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vote Options */}
          <div>
            <Label className="text-base font-medium mb-3 block">Your Vote</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={voteType === 'for' ? 'default' : 'outline'}
                onClick={() => setVoteType('for')}
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                  voteType === 'for' 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'border-green-600 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'
                }`}
                data-testid="button-vote-for"
              >
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Vote For</span>
                <span className="text-xs opacity-75">Support this proposal</span>
              </Button>

              <Button
                variant={voteType === 'against' ? 'default' : 'outline'}
                onClick={() => setVoteType('against')}
                className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                  voteType === 'against' 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
                }`}
                data-testid="button-vote-against"
              >
                <XCircle className="w-6 h-6" />
                <span className="font-medium">Vote Against</span>
                <span className="text-xs opacity-75">Oppose this proposal</span>
              </Button>
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="voteComment">Comment (Optional)</Label>
            <Textarea
              id="voteComment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment explaining your vote..."
              rows={3}
              className="mt-2"
              data-testid="textarea-vote-comment"
            />
          </div>

          {/* Voting Info */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <Vote className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-medium mb-1">Voting Information:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Your vote is weighted by your contribution amount</li>
                  <li>• Votes are recorded permanently on the blockchain</li>
                  <li>• You cannot change your vote once submitted</li>
                  <li>• Voting period may have a deadline</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={handleVote}
              disabled={!voteType || isSubmitting || !isConnected}
              className="flex-1 bg-primary hover:bg-primary-dark text-white"
              data-testid="button-submit-vote"
            >
              {isSubmitting ? 'Submitting Vote...' : `Submit ${voteType ? voteType.charAt(0).toUpperCase() + voteType.slice(1) : ''} Vote`}
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              data-testid="button-cancel-vote"
            >
              Cancel
            </Button>
          </div>

          {!isConnected && (
            <div className="text-center text-sm text-red-600">
              Please connect your wallet to vote
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
