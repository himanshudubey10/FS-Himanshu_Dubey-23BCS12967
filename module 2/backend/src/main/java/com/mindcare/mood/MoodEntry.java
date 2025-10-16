package com.mindcare.mood;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("mood_entries")
public class MoodEntry {
    @Id
    private String id;
    private String userId;
    private int moodValue; // 1-10
    private String notes;
    private Instant timestamp;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public int getMoodValue() { return moodValue; }
    public void setMoodValue(int moodValue) { this.moodValue = moodValue; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}



