import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import CommentList from '../components/CommentList';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { name } = useParams();
    const article = articleContent.find(article => article.name === name);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name}`);
            const body = await result.json();
            setArticleInfo(body);
        };
        fetchData();
    }, [name]);

    if (!article) return <NotFoundPage />
    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
            <h1>{article.title}</h1>
            <p>This post has been upvoted {articleInfo.upvotes} times</p>
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <CommentList comments={articleInfo.comments}/>
            <h3>Other Articles:</h3>
            <ArticleList articles={otherArticles}/>
        </>
    );
};

export default ArticlePage;