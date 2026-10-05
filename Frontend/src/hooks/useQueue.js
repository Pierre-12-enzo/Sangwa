// src/hooks/useQueue.js
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queueAPI } from '../api/client';
import { useSSE } from './useSSE';

/**
 * useQueue — fetches the doctor's queue for a date + subscribes to live updates.
 *
 * @param {object} params - { doctorId, date, session }
 *   date: 'YYYY-MM-DD'
 *   session: 'morning' | 'afternoon' | 'evening' (optional)
 */
export function useQueue({ doctorId, date, session, enabled = true }) {
  const queryClient = useQueryClient();

  const queryKey = ['queue', doctorId, date, session];

  const query = useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await queueAPI.getMyQueue({
        doctorId,
        date,
        session
      });
      return data;
    },
    enabled: enabled && !!doctorId && !!date,
    refetchInterval: 30000, // safety net if SSE drops
    staleTime: 10000
  });

  // Real-time updates via SSE
  const channels = doctorId && date
    ? `queue:doctor:${doctorId}:${date}`
    : null;

  const { status: sseStatus } = useSSE(
    channels,
    {
      onEvent: (eventName, payload) => {
        if (eventName === 'queue:changed') {
          // Invalidate the queue query to refetch
          queryClient.invalidateQueries({ queryKey });
        }
      }
    },
    { enabled: enabled && !!channels }
  );

  return {
    ...query,
    sseStatus
  };
}

export default useQueue;