import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  TREATMENTS,
  TREATMENT_CATEGORIES,
  type TreatmentCategory,
  type TreatmentItem,
} from '../data/clinicData';

const VALID_CATEGORIES = new Set<TreatmentCategory>([
  'all',
  'general',
  'restorative',
  'aesthetic',
]);

function getCategoryCount(categoryId: TreatmentCategory): number {
  if (categoryId === 'all') return TREATMENTS.length;
  return TREATMENTS.filter((t) => t.category === categoryId).length;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[()/,.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesTreatmentQuery(item: TreatmentItem, rawQuery: string): boolean {
  const normalized = normalizeText(rawQuery);
  if (!normalized) return true;

  const tokens = normalized.split(' ').filter(Boolean);
  const visibleText = normalizeText(
    [item.number, item.name, item.bengaliName ?? '', item.categoryLabel].join(' ')
  );
  const visibleWords = visibleText.split(' ').filter(Boolean);
  const keywordText = normalizeText(item.keywords.join(' '));

  return tokens.every((token) => {
    if (token.length === 1) {
      return visibleWords.some((word) => word.startsWith(token));
    }
    return visibleText.includes(token) || keywordText.includes(token);
  });
}

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const paramCat = searchParams.get('category') as TreatmentCategory | null;
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>(
    paramCat && VALID_CATEGORIES.has(paramCat) ? paramCat : 'all'
  );
  const [query, setQuery] = useState('');

  useEffect(() => {
    const currentParam = searchParams.get('category') as TreatmentCategory | null;
    if (currentParam && VALID_CATEGORIES.has(currentParam)) {
      setActiveCategory(currentParam);
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  const handleCategoryChange = (category: TreatmentCategory) => {
    setActiveCategory(category);
    const nextParams = new URLSearchParams(searchParams);
    if (category === 'all') {
      nextParams.delete('category');
    } else {
      nextParams.set('category', category);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (value.trim().length > 0 && activeCategory !== 'all') {
      handleCategoryChange('all');
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const normalizedQuery = normalizeText(query);

  const filteredTreatments = useMemo(() => {
    return TREATMENTS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;
      return matchesTreatmentQuery(item, query);
    });
  }, [activeCategory, query]);

  const handleBookTreatment = (treatmentLabel: string) => {
    navigate(`/book?treatment=${encodeURIComponent(treatmentLabel)}`);
  };

  return (
    <>
      <section className="bg-page-banner-light border-b border-slate-200/80 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm font-semibold text-[#7C5E34]">
            Clinical Services Catalog
          </p>
          <h1 className="mt-2 font-serif-display text-3xl font-semibold tracking-tight text-[#0B1F3A] sm:text-4xl text-balance">
            Complete Dental, Implant &amp; Aesthetic Treatments
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Browse all 13 clinical treatments offered at Dental Indoor. Search by
            treatment name or choose a category below to schedule via WhatsApp.
          </p>
        </div>
      </section>

      <section className="bg-porcelain-canvas py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className="flex w-full max-w-xl items-center gap-2"
              >
                <div className="relative flex-1 min-w-0">
                  <Search
                    className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400"
                    aria-hidden="true"
                  />
                  <input
                    id="treatment-search-input"
                    type="text"
                    inputMode="search"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    placeholder="Search e.g. RCT, Implant, Braces, Cap, ব্রেসেস..."
                    aria-label="Search dental treatments"
                    className="min-h-[44px] w-full rounded-xl border border-slate-300/90 bg-white py-2 pr-10 pl-10 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-[#9A7B4F] focus:outline-none focus:ring-2 focus:ring-[#9A7B4F]/20"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="Clear search"
                      className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="min-h-[44px] rounded-xl bg-[#0B1F3A] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#14325C] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Search
                </button>
              </form>

              <p className="text-xs sm:text-sm font-medium text-slate-600 tabular-nums shrink-0">
                {normalizedQuery
                  ? `${filteredTreatments.length} match${filteredTreatments.length === 1 ? '' : 'es'} for "${query.trim()}"`
                  : `Showing ${filteredTreatments.length} of ${TREATMENTS.length} treatments`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div
                role="tablist"
                aria-label="Filter treatments by category"
                className="flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200/90 bg-white p-1.5 shadow-xs"
              >
                {TREATMENT_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category.id;
                  const count = getCategoryCount(category.id);
                  const shortLabel = category.label
                    .replace('All Treatments (13)', 'All Treatments')
                    .replace(/\s*\(\d+\)$/, '');
                  return (
                    <button
                      key={category.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`min-h-[38px] rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] ${
                        isActive
                          ? 'bg-[#0B1F3A] text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]'
                      }`}
                    >
                      <span>{shortLabel}</span>{' '}
                      <span
                        className={`ml-1 font-mono text-[11px] tabular-nums ${
                          isActive ? 'text-[#DFC191]' : 'text-slate-400'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {(normalizedQuery || activeCategory !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    handleCategoryChange('all');
                  }}
                  className="min-h-[36px] text-xs sm:text-sm font-semibold text-[#0B1F3A] hover:underline whitespace-nowrap cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {filteredTreatments.length === 0 ? (
            <div className="card-elevated mt-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <p className="font-serif-display text-lg font-semibold text-[#0B1F3A]">
                No matching treatments found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Try searching terms like RCT, Implant, Braces, Whitening, Filling,
                or Extraction.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  handleCategoryChange('all');
                }}
                className="mt-5 inline-flex min-h-[40px] items-center rounded-lg bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#14325C] cursor-pointer"
              >
                Show all 13 treatments
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTreatments.map((item) => {
                const labelForBooking = item.bengaliName
                  ? `${item.name} (${item.bengaliName})`
                  : item.name;

                return (
                  <article
                    key={item.id}
                    className="card-elevated bg-silk-surface group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9A7B4F]/70"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#9A7B4F] via-[#DFC191] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />
                    <div>
                      <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3 text-xs text-slate-500">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-semibold tabular-nums text-[#9A7B4F]">
                            {item.number}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.categoryLabel}</span>
                        </div>
                        <span className="h-px w-6 bg-slate-200 transition-colors group-hover:bg-[#9A7B4F]" />
                      </div>

                      <h2 className="mt-4 font-serif-display text-xl font-semibold text-[#0B1F3A]">
                        {item.name}
                      </h2>

                      {item.bengaliName && (
                        <p className="mt-0.5 text-sm font-medium text-[#7C5E34]">
                          {item.bengaliName}
                        </p>
                      )}

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {item.description}
                      </p>

                      <p className="mt-3 text-xs leading-relaxed text-slate-500">
                        {item.clinicalNote}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleBookTreatment(labelForBooking)}
                        className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-[#0B1F3A] transition-colors group-hover:text-[#7C5E34] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1F3A] rounded-sm whitespace-nowrap cursor-pointer"
                      >
                        <span>Book on WhatsApp</span>
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
