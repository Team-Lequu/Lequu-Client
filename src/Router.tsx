import * as Sentry from '@sentry/react';
import { AxiosError } from 'axios';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadingPage from './components/common/LoadingPage';
import MyFavoriteBookList from './History/components/MyFavoriteBookList';
import MyLecueBookList from './History/components/MyLecueBookList';
import MyLetterList from './History/components/MyLetterList';
import Login from './Login/page';

const BoundaryErrorPage = lazy(
  () => import('./components/common/BoundaryErrorPage'),
);
const ClearToken = lazy(
  () => import('./components/common/ClearToken/ClearToken'),
);
const ErrorPage = lazy(() => import('./components/common/ErrorPage'));
const CreateBook = lazy(() => import('./CreateBook/page'));
const DetailPage = lazy(() => import('./Detail/page/DetailPage'));
const EditNickname = lazy(() => import('./EditNickname/page'));
const Enter = lazy(() => import('./Enter/page'));
const HealthTest = lazy(() => import('./HealthTest'));
const History = lazy(() => import('./History/page'));
const HistoryEnter = lazy(() => import('./HistoryEnter/page'));
const LecueNotePage = lazy(() => import('./LecueNote/page/LeceuNotePage'));
const LoginCallback = lazy(
  () => import('./Login/components/LoginCallback/LoginCallback'),
);
const Mypage = lazy(() => import('./Mypage/page'));
const Register = lazy(() => import('./Register/page'));
const SelectBookPage = lazy(() => import('./SelectBook/page/SelectBookPage'));
const SelectView = lazy(() => import('./SelectView/SelectView'));
const StickerAttach = lazy(() => import('./StickerAttach/page'));
const StickerPack = lazy(() => import('./StickerPack/page/StickerPack'));
const TargetPage = lazy(() => import('./Target/page/TargetPage'));

function Router() {
  interface FallbackProps {
    error: Error;
    resetError: () => void;
  }

  function fallback({ error, resetError }: FallbackProps) {
    if (
      error instanceof AxiosError &&
      (error.response?.status === 401 || error.response?.status === 403)
    ) {
      return <Login />;
    }
    return <BoundaryErrorPage resetError={resetError} />;
  }

  return (
    <BrowserRouter>
      <Sentry.ErrorBoundary fallback={fallback}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path="/" element={<SelectView />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-note" element={<LecueNotePage />} />
            <Route path="/sticker-pack" element={<StickerPack />} />
            <Route path="/detail" element={<DetailPage />} />
            <Route path="/mypage" element={<Mypage />}>
              <Route path="" element={<Enter />} />
              <Route path="edit-nickname" element={<EditNickname />} />
              <Route path="select-history" element={<HistoryEnter />} />
              <Route path="history" element={<History />}>
                <Route path="favorite" element={<MyFavoriteBookList />} />
                <Route path="mybook" element={<MyLecueBookList />} />
                <Route path="myletter" element={<MyLetterList />} />
              </Route>
            </Route>
            <Route path="/lecue-book/:bookUuid" element={<DetailPage />} />
            <Route path="/target" element={<TargetPage />} />
            <Route path="/test" element={<HealthTest />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route
              path="/sticker-attach/:bookUuid"
              element={<StickerAttach />}
            />
            <Route path="/select-book" element={<SelectBookPage />} />
            <Route path="/loading" element={<LoginCallback />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/loading-page" element={<LoadingPage />} />
            <Route path="/clear" element={<ClearToken />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
      </Sentry.ErrorBoundary>
    </BrowserRouter>
  );
}

export default Router;
