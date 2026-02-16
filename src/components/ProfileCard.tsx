import { Card, Badge, Button } from "@/components/ui";
import { StarRating } from "@/components/ui";

interface ProfileCardProps {
  name: string;
  storeName: string;
  bio?: string;
  avatarUrl?: string;
  rating?: number;
  totalReviews?: number;
  location?: string;
  specialty?: string;
  onViewProfile?: () => void;
}

export function ProfileCard({
  name,
  storeName,
  bio,
  avatarUrl,
  rating = 0,
  totalReviews = 0,
  location,
  specialty,
  onViewProfile,
}: ProfileCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name} avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-lg font-semibold text-gray-500">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-600">{storeName}</p>
            </div>
            {specialty && (
              <Badge variant="info" className="shrink-0">
                {specialty}
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={Math.round(rating)} size={16} />
            <span className="text-xs text-gray-600">
              {rating.toFixed(1)} ({totalReviews} reviews)
            </span>
          </div>

          {location && (
            <p className="mt-2 text-sm text-gray-600">{location}</p>
          )}
          {bio && <p className="mt-2 text-sm text-gray-700">{bio}</p>}

          {onViewProfile && (
            <div className="mt-4">
              <Button size="sm" onClick={onViewProfile}>
                View Profile
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
