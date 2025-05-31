package com.christmas.feed.domain;

import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class NicknameGenerator {

    private static final List<String> PREFIX = Arrays.stream(NicknamePrefix.values())
            .map(Enum::name)
            .toList();
    private static final List<String> SUFFIX = Arrays.stream(NicknameSuffix.values())
            .map(Enum::name)
            .toList();
    private static final String NICKNAME_FORMAT = "%s%s";
    private static final String DUPLICATE_NICKNAME_FORMAT = "%s %d";
    private static final Random random = new Random();

    public static String generate() {
        int prefixIndex = random.nextInt(PREFIX.size());
        int suffixIndex = random.nextInt(SUFFIX.size());

        return String.format(NICKNAME_FORMAT, PREFIX.get(prefixIndex), SUFFIX.get(suffixIndex));
    }

    public static String addCountForDuplicate(String nickName, int count) {
        return String.format(DUPLICATE_NICKNAME_FORMAT, nickName, count);
    }
}
