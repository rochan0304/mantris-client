import type React from "react";

interface AccountCardProps extends React.ComponentPropsWithoutRef<'div'> {
    accountName: string;
    accountId: string;
    accountBalance: string;
    symbol: string;
}

const AccountCard: React.FC<AccountCardProps> = ({accountName, accountId, accountBalance, symbol, style, ...props}) => {
    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                padding: '20px',
                backgroundColor: '#192126',
                borderRadius: '10px',
                ...style,
            }}
            { ...props }
        >
            <h3 style={{ fontSize: '14px'}}>{ accountName }</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px'}}>
                <p style={{ color: '#8F9395', fontSize: '12px' }}>Saldo actual</p>
                <p style={{ fontSize: '24px', fontFamily: 'Inter, sans-serif' }}><span style={{ color: '#8F9395' }}>{ symbol }</span> { accountBalance }</p>
            </div>
        </div>
    );
}

export default AccountCard;