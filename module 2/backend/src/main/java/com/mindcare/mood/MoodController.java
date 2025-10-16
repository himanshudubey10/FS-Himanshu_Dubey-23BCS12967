package com.mindcare.mood;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/mood")
@CrossOrigin(origins = "*")
public class MoodController {

    private final MoodEntryRepository repository;

    public MoodController(MoodEntryRepository repository) {
        this.repository = repository;
    }

    public record MoodRequest(@Min(1) @Max(10) int moodValue, String notes) {}

    @PostMapping
    public ResponseEntity<?> submitMood(@Valid @RequestBody MoodRequest req, Authentication authentication) {
        String userEmail = authentication.getName();
        // store email as userId for simplicity; in a real app we'd use user id
        MoodEntry entry = new MoodEntry();
        entry.setUserId(userEmail);
        entry.setMoodValue(req.moodValue());
        entry.setNotes(req.notes());
        entry.setTimestamp(Instant.now());
        repository.save(entry);
        return ResponseEntity.ok(entry);
    }

    @GetMapping
    public List<MoodEntry> list(Authentication authentication) {
        String userEmail = authentication.getName();
        return repository.findByUserIdOrderByTimestampDesc(userEmail);
    }
}



