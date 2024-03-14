import { Link, useNavigate } from "react-router-dom"
import styles from "./home.module.css"
import { FormEvent, useEffect, useState } from "react"
//fazendo import de icone do react-icons
import { BiSearch } from "react-icons/bi"

interface CoinsProps {
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;
}

interface DataProps {
    coins: CoinsProps[]
}
// fiz uma tipagem no Data para que ele recebe as propriedades do CoinsProps ao invés de estar apontado para o nada

//https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6
export function Home() {

    const [coins, setCoins] = useState<CoinsProps[]>([]) //passando para o meu state como CoinsProps[], ele não vai entender que é um objeto mas sim uma lista.

    const [inputValue, setInputValue] = useState("")
    //não é preciso typar porque o state já entende vai receber um texto
    
    const navigate = useNavigate()
    //vai nos permitir navegar para uma rota especifica através do search

    //estou usando esse hook pra quando a pagina atualizar ele trazer todos os dados da API
    useEffect(() => {
        function getData() {
            fetch('https://sujeitoprogramador.com/api-cripto/?key=b4cd8f8fb3de94c6&pref=BRL') //esse fetch é uma promessa que vai dar errado ou certo
                .then(response => response.json()) //caso de tudo certo vamos transforma essa response em JSON
                .then((data: DataProps) => { //seria pra caso de errado, seria o tratamento de erro
                    let coinsData = data.coins.slice(0, 15) //ao invés de pegar todos os 100 itens da lista, vamos usar apenas 15, por isso usei o SLICE que é para pegar da posição 0 a 15 

                    let price = Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })

                    //fiz um map para formatar o preço e o valor de mercado da minha lista de moedas
                    const formatResult = coinsData.map((item) => {
                        const formated = {
                            ...item,
                            formatedPrice: price.format(Number(item.price)),
                            formatedMarket: price.format(Number(item.market_cap)),
                        }
                        return formated;
                    })

                    setCoins(formatResult);
                })
        }
        getData();
    }, [])

    function handleSearch(e: FormEvent) {
        e.preventDefault();
        if(inputValue === "") return;

        navigate(`/detail/${inputValue}`)
    }

    return (
        <div>
            <main className={styles.container}>
                <form className={styles.form} onSubmit={handleSearch}>
                    <input
                        placeholder="Digite o simbolo da moeda: BTC..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">
                        <BiSearch size={30} color=" #fff " />
                    </button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Moeda</th>
                            <th scope="col">Valor mercado</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map(coin => (
                            <tr key={coin.name} className={styles.tr}>
                                <td className={styles.tdLabel} data-label='Moeda'>
                                    <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                                        <span>{coin.name}</span> | {coin.symbol}
                                    </Link>
                                </td>
                                <td className={styles.tdLabel} data-label='Mercado'>
                                    {coin.formatedMarket}
                                </td>
                                <td className={styles.tdLabel} data-label='Preço'>
                                    {coin.formatedPrice}
                                </td>
                                <td className={Number(coin?.delta_24h) >= 0 ? styles.tdprofit : styles.tdLoss} data-label='Volume'>
                                    <span>{coin.delta_24h}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    )
}