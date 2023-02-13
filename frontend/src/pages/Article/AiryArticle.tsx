import React, { useRef, useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import '@fontsource/roboto-mono';

import { selectArticle } from '../../redux';
import { declinationSubstance } from '../../helpers';
import { useDocTitle } from '../../hooks';
import { ActionButtons, AuthorInfo, CommentsBlock, toHtml, ScrollControls, Sidebar, UpNext, BackTopButton } from '.';

import styles from './AiryArticle.module.scss';

export const AiryArticle: React.FC = () => {
    useDocTitle('Статья');

    const articleContentRef = useRef<HTMLDivElement>(null);
    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const article = useSelector(selectArticle);

    const createdOn = moment(article.created_on).format('L');

    return (
        <article className={styles.root}>
            <div className={styles.container}>
                <div className={`${styles.content} ${isOpenSidebar ? 'open-sidebar' : ''}`}>
                    <div className={styles.contentContainer}>
                        <div className={styles.articleDate}>{createdOn}</div>
                        <header className={styles.top}>
                            <div className={styles.topContent}>
                                <h1 className={styles.articleHeadline}>{article?.title}</h1>
                                <div className={styles.subHeader}>
                                    <div className={styles.readingTime}>
                                        {article.reading_time
                                            ? `${declinationSubstance(article.reading_time, 'minutes')} чтения`
                                            : 'время чтения не подсчитано'}
                                        {}{' '}
                                    </div>
                                    {!isTablet && <ActionButtons />}
                                </div>
                            </div>
                        </header>
                        <AuthorInfo />
                        {isTablet && <ActionButtons />}
                        <div className={styles.hero}>
                            <figure>
                                <div className={styles.coverContainer}>
                                    <img
                                        src={article?.cover}
                                        className={styles.articleCover}
                                        alt="Обложка"
                                        loading="lazy"
                                    />
                                </div>
                            </figure>
                        </div>
                        <div className={styles.contentWrapper}>
                            <div ref={articleContentRef} className={styles.articleContent}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(article?.blocks),
                                    }}
                                    className={styles.contentBlocks}
                                />
                                <AuthorInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="articleBottom" className={styles.bottom}>
                <UpNext />
            </div>
            <ScrollControls setOpenSidebar={setOpenSidebar} />
            <Sidebar isOpenSidebar={isOpenSidebar} setOpenSidebar={setOpenSidebar} title="Комментарии">
                <CommentsBlock />
            </Sidebar>
            <BackTopButton />
        </article>
    );
};