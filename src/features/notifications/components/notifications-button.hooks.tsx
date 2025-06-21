import { useInfiniteQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { getNotifications } from '../services/get-notifications'

export function useNotificationsButton() {
    const [hasUnseenNotifications, setHasUnseenNotifications] = useState(false)

    const { data, isPending, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: ['notifications'],
            queryFn: getNotifications,
            initialPageParam: 1,
            getNextPageParam: (lastPage, _, lastPageParam) => {
                if (lastPageParam < lastPage.pagination.totalPages) {
                    return lastPage.pagination.page + 1
                } else {
                    return null
                }
            },
        })

    const { ref, inView } = useInView()

    // if loader ref is in view, fetch next page
    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [inView, fetchNextPage])

    // set unseen notifications on render
    useEffect(() => {
        if (data) {
            data.pages.map(({ data: notifications }) => {
                const hasUnseen = notifications.some(n => !n.isRead)
                setHasUnseenNotifications(hasUnseen)
            })
        }
    }, [data])

    return { data, isFetchingNextPage, isPending, ref, hasUnseenNotifications }
}
