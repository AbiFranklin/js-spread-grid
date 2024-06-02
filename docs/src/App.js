import './App.css';
import Installation from './pages/basics/installation';
import YourFirstGrid from './pages/basics/your-first-grid';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Headers from './pages/columns-and-rows/headers';
import { Fragment } from 'react';
import ErrorOverlay from './pages/error-handling/error-overlay';
import CellClick from './pages/events/cell-click';
import Filtering from './pages/data-shaping/filtering';
import Size from './pages/columns-and-rows/size';
import Sorting from './pages/data-shaping/sorting';
import AppManager from './pages/examples/app-manager';
import About from './pages/basics/about';
import Heatmap from './pages/examples/heatmap';
import Resources from './pages/basics/resources';
import Plotter from './pages/examples/plotter';
import { default as FormattingIntroduction } from './pages/formatting/introduction';
import { default as ColumnsAndRowsIntroduction } from './pages/columns-and-rows/introduction';
import { default as EditingIntroduction } from './pages/editing/introduction';
import DataBlock from './pages/columns-and-rows/data-block';
import Ids from './pages/columns-and-rows/ids';
import DataSelector from './pages/columns-and-rows/data-selector';
import Style from './pages/formatting/style';
import Selectors from './pages/formatting/selectors';
import Text from './pages/formatting/text';
import Value from './pages/formatting/value';
import Draw from './pages/formatting/draw';
import Font from './pages/formatting/font';
import Tooltips from './pages/events/tooltips';
import Active from './pages/data-shaping/active';

const routes = [
    {
        chapter: 'basics',
        pages: [
            { title: 'about', page: About },
            { title: 'installation', page: Installation },
            { title: 'your first grid', page: YourFirstGrid },
            { title: 'resources', page: Resources }
        ]
    },
    {
        chapter: 'columns and rows',
        pages: [
            { title: 'introduction', page: ColumnsAndRowsIntroduction },
            { title: 'ids', page: Ids },
            { title: 'headers', page: Headers, wip: true },
            { title: 'data block', page: DataBlock },
            { title: 'data selector', page: DataSelector },
            { title: 'size', page: Size }
        ]
    },
    {
        chapter: 'formatting',
        pages: [
            { title: 'introduction', page: FormattingIntroduction },
            { title: 'selectors', page: Selectors },
            { title: 'style', page: Style },
            { title: 'text', page: Text },
            { title: 'font', page: Font },
            { title: 'value', page: Value },
            { title: 'draw', page: Draw }
        ]
    },
    {
        chapter: 'data shaping',
        pages: [
            { title: 'sorting', page: Sorting },
            { title: 'filtering', page: Filtering, wip: true },
            { title: 'active', page: Active, wip: true }
        ]
    },
    {
        chapter: 'events',
        pages: [
            { title: 'cell click', page: CellClick, wip: true },
            { title: 'tooltips', page: Tooltips, wip: true },
        ]
    },
    {
        chapter: 'editing',
        pages: [
            { title: 'introduction', page: EditingIntroduction, wip: true }
        ]
    },
    {
        chapter: 'error handling',
        pages: [
            { title: 'error overlay', page: ErrorOverlay }
        ]
    },
    {
        chapter: 'examples',
        pages: [
            { title: 'app manager', page: AppManager },
            { title: 'heatmap', page: Heatmap },
            { title: 'plotter', page: Plotter }
        ]
    }
].map(({ chapter, pages }) => ({
    chapter,
    pages: pages.map(({ title, page, wip }) => ({
        title,
        Page: page,
        path: `/${chapter.replaceAll(' ', '-')}/${title.replaceAll(' ', '-')}`,
        wip: wip || false
    }))
}));

function Navbar() {
    const location = useLocation();
    const pathname = location.pathname === '/' ? '/basics/about' : location.pathname;

    return (
        <div className="App-navbar">
            <img src="/logo-small.png" alt="logo" className="App-navbar-logo" />
            <div className="App-navbar-title">Spread Grid</div>
            <div className="App-navbar-subtitle">beta</div>
            {routes.map(({ chapter, pages }) => (
                <Fragment key={chapter}>
                    <div className="App-navbar-header">{chapter}</div>
                    {pages.map(({ title, path, wip }) => {
                        const isSelected = pathname === path;
                        const className = `App-navbar-item${isSelected ? ' Selected' : ''}${wip ? ' Wip' : ''}`;
                        return <Link key={title} to={path} className={className}>{title}</Link>
                    })}
                </Fragment>
            ))}
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar />
                <div className="App-content">
                    <div className="App-content-body">
                        <Routes>
                            <Route path="/" element={<About />} />
                            {routes.map(({ pages }) => (
                                pages.map(({ title, path, Page }) => (
                                    <Route key={title} path={path} element={<Page />} />
                                ))
                            )).flat()}
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
