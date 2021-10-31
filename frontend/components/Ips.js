export default function Ips(props) {
    if (props.ips.length == 0) return null;

    const ipTableRow = (ip, index) => (
        <tr key = {index}>
            <td>{ip}</td>
            {props.mode !== 'blacklisted' && (<td><button onClick={() => props.function(null,ip)}> Bloquear</button></td>)}
        </tr>
    );

    const ipTable = props.ips.map((ip, index) => ipTableRow(ip, index));

    return (
        <table>
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
        </table>
    )
}