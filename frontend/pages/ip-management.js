import Head from 'next/head';
import {getAllIps, getNonBlacklistedIps, putOnBlacklist, getBlacklist} from '../services/IpService';
import { useState, useEffect } from 'react';
import Ips from '../components/Ips';
import LoadingSpinner from '../components/LoadingSpinner';

export default function IpManagement() {
    const [ipList, setIpList] = useState(null);
    const [mode, setMode] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
       const initialMode = localStorage.getItem('mode');
       console.log('initialMode is', initialMode);
       setMode( initialMode === null ? 'all' : initialMode );
    }, []);

    useEffect(() => {
        localStorage.setItem('mode',mode);
        console.log('mode is', mode);
        setLoading(true);
    }, [mode])

    useEffect(async () => {
        if(loading) await updateIpList();
    }, [loading])

    
    const blacklistIp = async (userId, ipAddress) => {
        await putOnBlacklist(userId, ipAddress);
        setLoading(true);
        console.log('IP blacklistado!');
    }
    
    const updateIpList = async () => {
        let list;
        if(mode === 'all') {
            list = await getAllIps();
        } 
        
        if(mode == 'nonBlacklisted'){
            list = await getNonBlacklistedIps();
        }

        if(mode == 'blacklisted'){
            list = await getBlacklist();
        }

        console.log('lista atualizada', list);
        console.log('mode', mode);
        console.log('mode localStorage', localStorage.getItem('mode'));
        setLoading(false);
        setIpList(list);
    }

    return (
    <>
        <Head>
            <title>IP Management</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </Head>
        <main>
            {
                loading ? <LoadingSpinner/> :
                (
                    <div>
                    <button onClick={() => setMode('all')}>A</button>
                    <button onClick={() => setMode('nonBlacklisted')}>B</button>  
                    <button onClick={() => setMode('blacklisted')}>C</button>  
                    {
                        ipList &&
                        (
                            <Ips 
                            mode = { mode } 
                            ips = {ipList} 
                            function={blacklistIp} />
                        )
                    }
                    </div>
                )
            }
        </main>
    </>
    )
}