import './App.css';
import { useAccount, useConnect, useDisconnect, useEnsName, useBalance } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

function App() {
  const { address, isConnected } = useAccount()
  const {disconnect} = useDisconnect()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { data: bl, isError, isLoading } = useBalance({
    address,
  })
  if (isLoading) return <div>Fetching balance…</div>
  if (isError) return <div>Error fetching balance</div>
  return (
    <div className="App">
        <div className="card">
          {isConnected && (
            <div>Address: <p>{address}</p> ETH Balance: <p>{bl?.formatted} {bl?.symbol}</p> <hr /></div>
          )}
          {!isConnected && <button className='btn connect' onClick={() => connect()}>Connect</button>}
          {isConnected && <button className='btn close' onClick={() => disconnect()}>Disconnect</button>}

        </div>
    </div>
  );
}

export default App;
