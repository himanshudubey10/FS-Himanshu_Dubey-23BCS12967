package com.mindcare.mood;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MoodEntryRepository extends MongoRepository<MoodEntry, String> {
    List<MoodEntry> findByUserIdOrderByTimestampDesc(String userId);
}



