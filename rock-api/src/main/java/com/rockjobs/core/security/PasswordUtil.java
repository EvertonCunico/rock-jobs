package com.rockjobs.core.security;

import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.util.Regex;
import lombok.SneakyThrows;
import org.mindrot.jbcrypt.BCrypt;

import java.security.SecureRandom;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PasswordUtil {

    public static String gerar() {
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var random = new SecureRandom();
        return IntStream.range(0, 8)
                .mapToObj(i -> String.valueOf(characters.charAt(random.nextInt(characters.length()))))
                .collect(Collectors.joining());
    }

    @SneakyThrows
    public static void validar(String senha) {
        if (!senha.matches(Regex.SENHA_PADRAO_SISTEMA)) {
            throw ValidacaoException.builder().status(400).mensagem("A senha deve ter pelo menos 5 e no máximo 16 caracteres, incluindo pelo menos um dígito, uma letra minúscula e uma letra maiúscula.").build();
        }
    }

    public static String encryptPassword(String password) {
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
        return hashedPassword;
    }

    public static boolean verifyPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }

    public static void main(String[] args) {
        String password = "123";

        // Criptografa a senha
        String hashedPassword = encryptPassword(password);
        System.out.println("Hashed Password: " + hashedPassword);

        // Verifica se a senha fornecida coincide com a senha criptografada
        boolean isMatch = verifyPassword(password, hashedPassword);
        System.out.println("Password Match: " + isMatch);
    }
}
