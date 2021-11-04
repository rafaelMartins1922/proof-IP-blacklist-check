import { Table } from 'react-bootstrap';
import {MdBlock} from 'react-icons/md';

export default function IpsTableComponent(props) {
    if (props.ips.length == 0) return null;

    const ipTableRow = (ip, index) => (
        <tr key = {index}>
            <td>{ip}</td>
            {props.mode !== 'blacklisted' && (<td><button disabled={props.loading} title="Bloquear IP" className="block-button" onClick={() => props.function(ip)}><MdBlock className="block-icon"/></button></td>)}
        </tr>
    );

    const ipTable = props.ips.map((ip, index) => ipTableRow(ip, index));

    return (
        <div className="ip-table-div">
            <Table className="ip-table">
                <thead>
                    <tr>
                        <th>{
                                props.mode === 'all' ? 
                                'Todos os IPS' : 
                                (
                                    props.mode === 'nonBlacklisted' ? 'IPS não bloqueados' : 'IPS bloqueados'
                                ) 
                            }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {ipTable}
                </tbody>
            </Table>
        </div>
    )
}