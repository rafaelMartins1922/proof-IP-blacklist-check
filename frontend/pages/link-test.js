import Head from 'next/head'

export default function LinkTest (props) {
    return (
        <div>  
            <Head>
                <link rel="icon" href="cat-smile.jpg"></link>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div>{props.children}</div>
            <h1>Link test!</h1>
        </div>
    )
}

