import { useEffect, useState } from 'react';
import styles from './detail.module.css'
import {useNavigate, useParams} from 'react-router-dom'

interface CoinProp{
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowprice: string;
    formatedHighprice: string;
    error?: string;
    //essa propriedade é opcional, só pra caso ele não encontre nada, ai ele exibira um erro
}

export function Detail() {
    const {cripto} = useParams();
    const [detail, setDetail] = useState<CoinProp>();
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        function getData(){
            fetch(`https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6&pref=BRL&symbol=${cripto}`)
            .then(response => response.json())
            .then((data:CoinProp) => {
                //trazendo a nossa interface

                if(data.error){
                    navigate('/')
                }
                let price = Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })

                //passando as nossas propriedade e formatando elas
                const resultData = {
                    ...data,
                    formatedPrice: price.format(Number(data.price)),
                    formatedMarket: price.format(Number(data.market_cap)), 
                    formatedLowprice: price.format(Number(data.low_24h)),
                    formatedHighprice: price.format(Number(data.high_24h))
                }
                setDetail(resultData);
                setLoading(false)
            })
        }
        getData();
    },[cripto])

    //quando a pagina estiver carregando irá exibigir "Carregando..."
    if(loading){
        return(
            <div className={styles.container}>
                <h4 className={styles.container}>Carregando...</h4>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.container}>{detail?.name}</h1>
            <p className={styles.container}>{detail?.symbol}</p>
            <section className={styles.content}>
                <p>
                    <strong>Preço:</strong> {detail?.formatedPrice}
                </p>
                <p>
                    <strong>Maior preço:</strong>{detail?.formatedHighprice}
                </p>
                <p>
                    <strong>Menor preço:</strong>{detail?.formatedLowprice}
                </p>
                <p>
                    <strong>Delta 24h:</strong>{detail?.delta_24h}
                </p>
                <p>
                    <strong>Valor Mercado:</strong>{detail?.formatedMarket}
                </p>
            </section>
        </div>
    )
}