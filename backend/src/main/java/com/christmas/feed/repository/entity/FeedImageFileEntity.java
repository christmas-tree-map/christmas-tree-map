package com.christmas.feed.repository.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "feed_image_file")
public class FeedImageFileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id", nullable = false)
    private FeedEntity feedEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "image_file_id", nullable = false)
    private ImageFileEntity imageFileEntity;
}
