import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import CommentList from '../components/CommentList';
import UpvoteSection from '../components/UpvoteSection';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';
import AddCommentForm from './../components/AddCommentForm';

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
            <UpvoteSection 
                articleName={name} 
                upvotes={articleInfo.upvotes} 
                setArticleInfo={setArticleInfo}
            />
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
        
            <CommentList comments={articleInfo.comments}/>
            <AddCommentForm 
                articleName={name} 
                setArticleInfo={setArticleInfo} 
            />

            <h3>Other Articles:</h3>
            <ArticleList articles={otherArticles}/>
        </>
    );
};

export default ArticlePage;