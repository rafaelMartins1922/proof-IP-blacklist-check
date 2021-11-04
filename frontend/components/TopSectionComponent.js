import { Col, Container } from "react-bootstrap";

export default function TopSectionComponent() {
    return (
        <div className="top-section">
            <div className="top-section-bg"></div>
            <div className="intro-text">
                <h1 className="headline"> IP Blacklist Checker</h1>
                <p className="instructions">Utilize a lista abaixo para verificar os IPs seguros e não seguros da rede Tor. <br/>
                Clique no ícone de bloqueio para adicionar um IP à lista de bloqueados.
                </p>
            </div>
        </div>
    );
}