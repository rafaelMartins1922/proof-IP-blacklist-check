import {getAllIps, getNonBlacklistedIps, putOnBlacklist, getBlacklist} from '../services/IpService';
import { useState, useEffect } from 'react';
import IpsTableComponent from './IpsTableComponent';
import LoadingSpinnerComponent from './LoadingSpinnerComponent';
import { Container, Toast } from 'react-bootstrap';

export default function IPListSectionComponent() {
    const [ipList, setIpList] = useState(null);
    const [mode, setMode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showIpBlacklistedAlert, setShowIpBlacklistedAlert] = useState(false);

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

    
    const blacklistIp = async (ipAddress) => {
        await putOnBlacklist(ipAddress);
        setLoading(true);
        setShowIpBlacklistedAlert(true);
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
        <div className="ip-list-section">
            <div className="ip-list-section-row-1">
                <Container className="toast-container">
                    <Toast bg={"success"} onClose={() => setShowIpBlacklistedAlert(false)} show={showIpBlacklistedAlert} delay={2000} autohide>
                        <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Sucesso</strong>
                        </Toast.Header>
                        <Toast.Body className='text-white'><bold>IP Bloqueado</bold>!</Toast.Body>
                    </Toast>
                </Container>
            </div>
            <div className="ip-list-section-row-2">
                <div className='ip-list-section-col-1'>
                    {
                        loading ? 
                        <Container className="loading-spinner-container">
                            <LoadingSpinnerComponent className="loading-spinner"/>
                        </Container> :
                        (
                            ipList && (
                                <IpsTableComponent 
                                mode = { mode } 
                                ips = {ipList} 
                                function={blacklistIp}
                                loading={loading}/>
                            )
                        )
                    }
                </div>
                <div className="ip-list-section-col-2">
                    <button disabled={loading} onClick={() => setMode('all')}>Todos os IPs</button>
                    <button disabled={loading} onClick={() => setMode('nonBlacklisted')}>IPs não bloqueados</button>
                    <button disabled={loading} onClick={() => setMode('blacklisted')}>IPs bloqueados</button>
                </div>
            </div>
        </div>
    )
}