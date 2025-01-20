package com.christmas.util;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Component;

@Component
public class RandomIntPicker implements RandomPicker {

    private static final Random random = new Random();

    @Override
    public Integer pickValue(int range) {
        return random.nextInt(range);
    }

    @Override
    public List<Integer> pickUniqueValues(int range, int count) {
        if (range < count) {
            throw new IllegalArgumentException("count 값이 range보다 클 수 없습니다.");
        }
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            int value = random.nextInt(range);
            while (result.contains(value)) {
                value = random.nextInt(range);
            }
            result.add(value);
        }
        return result;
    }
}
