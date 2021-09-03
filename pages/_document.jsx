import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../lib/gtag'

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        let props = { ...initialProps };
        
        return props;
    }

    render() {
        return (
            <Html>
                <Head>
                {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
                 <script
                    dangerouslySetInnerHTML={{
                        __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                    });
                    `,
                    }}
                />
                {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-52LB07H1WJ"></script>
                 <script
                    dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-52LB07H1WJ');
                            `,
                    }}
                /> */}


                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" href="/static/assets/vendor/font-awesome/css/fontawesome-all.min.css"/>
                    <link rel="icon" href="/static/assets/css/images/favicon.png" type="image/x-icon"/>
      
                    <link rel="stylesheet" type="text/css" href="/static/assets/css/theme.css"/>
                    <link rel="stylesheet" href="/static/assets/css/font-electro.css"/>

                    <link rel="stylesheet" href="/static/assets/vendor/animate.css/animate.min.css"/>
                    <link rel="stylesheet" href="/static/assets/vendor/hs-megamenu/src/hs.megamenu.css"/>
                    <link rel="stylesheet" href="/static/assets/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css"/>
                    <link rel="stylesheet" href="/static/assets/vendor/fancybox/jquery.fancybox.css"/>
                    <link rel="stylesheet" href="/static/assets/vendor/slick-carousel/slick/slick.css"/>
                    <link rel="stylesheet" href="/static/assets/vendor/bootstrap-select/dist/css/bootstrap-select.min.css"/>
                   
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    
                </body>
            </Html>
        );
    }
}