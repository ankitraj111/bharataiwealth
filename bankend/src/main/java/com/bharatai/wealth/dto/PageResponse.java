package com.bharatai.wealth.dto;

import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Standard paginated API response wrapper.
 * All paginated endpoints return this shape so the frontend can
 * implement prev/next navigation without loading all records.
 *
 * Response shape:
 * {
 *   "content":       [...],
 *   "page":          0,
 *   "size":          20,
 *   "totalElements": 150,
 *   "totalPages":    8,
 *   "hasNext":       true,
 *   "hasPrevious":   false
 * }
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean hasNext,
        boolean hasPrevious
) {
    /**
     * Factory method: convert a Spring Data {@link Page} into a {@link PageResponse}.
     */
    public static <T> PageResponse<T> of(Page<T> springPage) {
        return new PageResponse<>(
                springPage.getContent(),
                springPage.getNumber(),
                springPage.getSize(),
                springPage.getTotalElements(),
                springPage.getTotalPages(),
                springPage.hasNext(),
                springPage.hasPrevious()
        );
    }
}
