import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { EventParticipationRequest, User, Vendor } from "@prisma/client";
import Image from "next/image";
import { format } from "date-fns";
import { Role, getRoleFromUser } from "@/lib/utils";
import UserLink from "../common/UserLink";

interface EventParticipationRequestItemProps {
  eventParticipationRequest: EventParticipationRequest & {
    vendor: Vendor & { user: User & Role };
  };
}

const EventParticipationSettleItem = ({
  eventParticipationRequest,
}: EventParticipationRequestItemProps) => {
  let user_role = getRoleFromUser(eventParticipationRequest.vendor.user);
  return (
    <div>
      <ul className="grid gap-4 mt-4">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {user_role && (
              <UserLink
                userId={user_role.id}
                userName={eventParticipationRequest.vendor.user.name}
                userImage={eventParticipationRequest.vendor.user.image}
                userType={
                  eventParticipationRequest.vendor.user.role as
                    | "vendor"
                    | "organizer"
                }
              />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default EventParticipationSettleItem;
