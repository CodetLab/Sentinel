import { Eye, KeyRound } from "lucide-react";
import "./CredentialCard.css";

interface CredentialCardProps {
  name: string;
  username: string;
}

export default function CredentialCard({
  name,
  username,
}: CredentialCardProps) {
  return (
    <article className="credential-card">
      <div className="credential-card__top">
        <div className="credential-card__icon">
          <KeyRound size={20} />
        </div>

        <button aria-label={`View ${name}`}>
          <Eye size={18} />
        </button>
      </div>

      <div>
        <h3>{name}</h3>
        <p>{username}</p>
      </div>

      <div className="credential-card__password">
        ••••••••••••
      </div>
    </article>
  );
}