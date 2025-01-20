package com.christmas.util;

import java.util.List;

public interface RandomPicker<T> {

    T pickValue(int range);

    List<T> pickUniqueValues(int range, int count);
}
