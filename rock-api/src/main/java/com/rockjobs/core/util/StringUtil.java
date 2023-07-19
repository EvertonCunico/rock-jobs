package com.rockjobs.core.util;

public class StringUtil {

    public static boolean isEmpty(String s) { return s == null || s.isEmpty() || s.isBlank(); }

    public static boolean isEmpty(Object s) { return s == null || s.toString().isEmpty() || s.toString().isBlank(); }

    public static boolean isNotEmpty(String s) { return !isEmpty(s); }

    public static boolean isNotEmpty(Object s) { return !isEmpty(s); }

    public static boolean isNumeric(String cs) {
        if (isEmpty(cs)) {
            return false;
        } else {
            int sz = cs.length();

            for(int i = 0; i < sz; ++i) {
                if (!Character.isDigit(cs.charAt(i))) {
                    return false;
                }
            }

            return true;
        }
    }
}
