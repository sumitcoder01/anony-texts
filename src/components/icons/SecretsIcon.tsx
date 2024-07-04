import { SquareAsterisk as SecretIcon } from 'lucide-react';

export type SecretsIconProps = {
    className?: string;
}

export const SecretsIcon = ({ className = "" }: SecretsIconProps) => {
    return (
        <div>
            <SecretIcon className={className} />
        </div>
    )
}

