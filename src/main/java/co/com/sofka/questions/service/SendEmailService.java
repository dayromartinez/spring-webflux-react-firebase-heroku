package co.com.sofka.questions.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
@Validated
public class SendEmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public SendEmailService() {
    }

    public Mono<String> sendEmail(String to, String subject, String body) {

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            message.setSubject(subject);
            MimeMessageHelper helper;
            helper = new MimeMessageHelper(message, true);
            helper.setFrom("djmd96@hotmail.com");
            helper.setTo(to);
            helper.setText(body, true);
            javaMailSender.send(message);

        } catch (MessagingException exception){
            exception.getMessage();
        }

        return Mono.just("¡Correo enviado exitosamente!");
    }


}


