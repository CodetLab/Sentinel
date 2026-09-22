import { Plus, Search } from "lucide-react";
import CredentialCard from "../../components/CredentialCard/CredentialCard";
import "./Vault.css";

const credentials = [
  {
    id: "1",
    name: "GitHub",
    username: "jordan@example.com",
  },
  {
    id: "2",
    name: "Google",
    username: "jordan@gmail.com",
  },
];

export default function Vault() {
  return (
    <div className="vault">
      <div className="vault__header">
        <div>
          <h1>Your Vault</h1>
          <p>Manage your credentials securely.</p>
        </div>

        <button className="vault__add-button">
          <Plus size={18} />
          Add credential
        </button>
      </div>

      <div className="vault__search">
        <Search size={18} />

        <input
          type="search"
          placeholder="Search credentials..."
          aria-label="Search credentials"
        />
      </div>

      <section className="vault__section">
        <div className="vault__section-header">
          <h2>Your credentials</h2>
          <span>{credentials.length}</span>
        </div>

        <div className="vault__grid">
          {credentials.map((credential) => (
            <CredentialCard
              key={credential.id}
              name={credential.name}
              username={credential.username}
            />
          ))}
        </div>
      </section>
    </div>
  );
}