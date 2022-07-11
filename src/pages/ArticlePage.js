import { useParams } from 'react-router-dom';
import ArticleList from '../components/ArticleList';
import articleContent from './article-content';

const ArticlePage = () => {
    const { name } = useParams();
    const article = articleContent.find(article => article.name === name);

    if (!article) return <h2>Article does not exist!</h2>

    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
            <h1>{article.title}</h1>
            {article.content.map((paragraph, key) => (
                <p key={key}>{paragraph}</p>
            ))}
            <h3>Other Articles:</h3>
            <ArticleList articles={otherArticles}/>
        </>
    );
};

export default ArticlePage;