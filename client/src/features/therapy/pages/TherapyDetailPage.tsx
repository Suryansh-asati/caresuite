import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PageContainer from '../../../shared/layout/PageContainer';
import LoadingSpinner from '../../../shared/ui/LoadingSpinner';
import { useTherapySession } from '../hooks/useTherapySession';
import { TherapyPlayer } from '../components/TherapyPlayer';

export const TherapyDetailPage: React.FC = () => {
  const { id } = useParams();
  const { session, loading, error } = useTherapySession(id);

  if (loading) {
    return (
      <PageContainer>
        <div className="rounded-3xl border border-slate-100 bg-white px-6 py-16 shadow-sm">
          <LoadingSpinner />
        </div>
      </PageContainer>
    );
  }

  if (error || !session) {
    return (
      <PageContainer>
        <section className="rounded-3xl border border-rose-100 bg-rose-50 px-6 py-8 text-rose-700">
          <h1 className="text-xl font-semibold">Therapy session unavailable</h1>
          <p className="mt-2 text-sm">{error || 'This therapy session could not be found.'}</p>
          <Link
            to="/therapy"
            className="mt-6 inline-flex rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            Back to therapy library
          </Link>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        <Link
          to="/therapy"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          Back to all sessions
        </Link>

        <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm">
          {session.thumbnail ? (
            <img
              src={session.thumbnail}
              alt={`${session.title} background`}
              className="h-56 w-full object-cover sm:h-72"
              loading="eager"
            />
          ) : (
            <div className="h-56 w-full bg-gradient-to-br from-emerald-100 to-sky-100 sm:h-72" />
          )}

          <div className="space-y-5 p-6 sm:p-8">
            <header className="space-y-3">
              <p className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-emerald-700">
                {session.category}
              </p>
              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{session.title}</h1>
              <p className="text-sm text-slate-500">{session.duration} min guided session</p>
              {session.description ? <p className="text-slate-700">{session.description}</p> : null}
            </header>

            <TherapyPlayer src={session.audioUrl} title={session.title} />
          </div>
        </article>

        <section className="rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-sky-50 px-6 py-6">
          <h2 className="text-lg font-semibold text-slate-900">Related sessions</h2>
          <p className="mt-2 text-sm text-slate-600">
            More recommendations will appear here as the therapy library grows.
          </p>
        </section>
      </div>
    </PageContainer>
  );
};

export default TherapyDetailPage;
