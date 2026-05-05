import useSWR from 'swr';
import { useAppStore } from '../store';

const fetcher = async ([url, userId]: [string, string]) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (userId) {
    headers['x-user-id'] = userId;
  }
  
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return res.json();
};

export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  state: string;
  type: string;
  rating: number;
  ranking: number | null;
  feesAnnual: number;
  placementAverageLpa: number;
  placementHighestLpa: number | null;
  description: string;
  imageUrl: string;
  logoUrl: string;
  website: string | null;
}

export interface Course {
  id: string;
  collegeId: string;
  name: string;
  degree: string;
  durationYears: number;
  feesAnnual: number;
}

export interface CollegeDetail extends College {
  courses: Course[];
}

export function useColleges(params?: { state?: string; type?: string; query?: string; maxFees?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.state) searchParams.set('state', params.state);
  if (params?.type) searchParams.set('type', params.type);
  if (params?.query) searchParams.set('query', params.query);
  if (params?.maxFees) searchParams.set('maxFees', params.maxFees);

  const queryStr = searchParams.toString();
  const url = `/api/colleges${queryStr ? `?${queryStr}` : ''}`;
  
  const { data, error, isLoading } = useSWR<College[]>([url, ''], fetcher);
  return { colleges: data, isLoading, isError: error };
}

export function useCollegeDetail(slugOrId: string) {
  const { data, error, isLoading } = useSWR<CollegeDetail>([`/api/colleges/${slugOrId}`, ''], fetcher);
  return { college: data, isLoading, isError: error };
}

export function useCompareColleges(ids: string[]) {
  const idString = ids.join(',');
  const url = idString ? `/api/colleges/compare?ids=${idString}` : null;
  const { data, error, isLoading } = useSWR<College[]>(url ? [url, ''] : null, fetcher);
  return { colleges: data || [], isLoading, isError: error };
}

export function useShortlists() {
  const userId = useAppStore(state => state.userId);
  const { data, error, isLoading, mutate } = useSWR<College[]>([`/api/shortlists`, userId], fetcher);
  return { shortlists: data || [], isLoading, isError: error, mutate };
}

export async function toggleShortlist(collegeId: string, isShortlisted: boolean, userId: string) {
  const url = isShortlisted ? `/api/shortlists/${collegeId}` : `/api/shortlists`;
  const method = isShortlisted ? 'DELETE' : 'POST';
  
  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId
    },
    body: !isShortlisted ? JSON.stringify({ collegeId }) : undefined
  });
  
  if (!res.ok) throw new Error('Failed to update shortlist');
  return res.json();
}
