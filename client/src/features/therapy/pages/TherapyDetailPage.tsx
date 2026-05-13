import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTherapySessionById } from '../hooks/useTherapy';
import { TherapyPlayer } from '../components/TherapyPlayer';
import Button from '../../../shared/ui/Button';

const TherapyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session, loading, error } = useTherapySessionById(id || '');

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-96 w-full rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-8 w-2/3 rounded bg-slate-200" />
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-2/3 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-900">Unable to Load Session</h2>
            <p className="mt-2 text-sm text-red-700">
              {error || 'The therapy session could not be found.'}
            </p>
            <Button variant="secondary" onClick={() => navigate('/therapy')} className="mt-4">
              Back to Sessions
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const durationMinutes = session.duration;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <div className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/therapy')}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Sessions
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Thumbnail and Player */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thumbnail */}
            {session.thumbnail ? (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={session.thumbnail}
                  alt={session.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-96 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-sky-100">
                <svg className="h-24 w-24 text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
            )}

            {/* Player */}
            <TherapyPlayer audioUrl={session.audioUrl} title={session.title} />

            {/* Description */}
            {session.description && (
              <div className="space-y-4 rounded-2xl bg-slate-50 p-6">
                <h3 className="text-lg font-semibold text-slate-900">About</h3>
                <p className="text-slate-600 leading-relaxed">{session.description}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Info */}
            <div className="rounded-2xl border border-slate-100 p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Category</p>
                  <p className="mt-1 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                    {session.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Duration</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">
                    {durationMinutes} minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-6">
              <h3 className="mb-4 font-semibold text-slate-900">Benefits</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Guided wellness experience</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Scientifically designed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Perfect for daily practice</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span>Accessible anytime</span>
                </li>
              </ul>
            </div>

            {/* Tips */}
            <div className="rounded-2xl border border-slate-100 p-6">
              <h3 className="mb-4 font-semibold text-slate-900">Tips</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                <li>• Find a quiet, comfortable space</li>
                <li>• Use headphones for best experience</li>
                <li>• Practice regularly for best results</li>
                <li>• No distractions needed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Sessions (Placeholder) */}
        <div className="mt-16 border-t border-slate-100 pt-12">
          <h3 className="mb-6 text-2xl font-bold text-slate-900">Explore More Sessions</h3>
          <div className="rounded-2xl bg-slate-50 p-8 text-center">
            <p className="text-slate-600">
              Discover more therapy sessions in different categories to support your wellness
              journey.
            </p>
            <Button variant="secondary" onClick={() => navigate('/therapy')} className="mt-4">
              Browse All Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TherapyDetailPage;
