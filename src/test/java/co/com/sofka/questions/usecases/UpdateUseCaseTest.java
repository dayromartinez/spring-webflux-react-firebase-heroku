package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;
import java.util.Objects;


@SpringBootTest
class UpdateUseCaseTest {


    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    private UpdateUseCase updateUseCase;

    @Test
    void updateTest() {

        var questionDto = new QuestionDTO(
                "2",
                "11",
                "¿Qué fue primero, el huevo o la gallina?",
                "OPINIÓN (CAJA PEQUEÑA ABIERTA)",
                "CIENCIA",
                "Gallina filosófica",
                "elhuevolagallina@trivia.com",
                "www.gallinadeloshuevosdeoro.com"
        );

        var question = new Question();
        question.setId("2");
        question.setUserId("11");
        question.setQuestion("¿Qué fue primero, el huevo o la gallina?");
        question.setType("OPINIÓN (CAJA PEQUEÑA ABIERTA)");
        question.setCategory("CIENCIA");
        question.setEmailUser("elhuevolagallina@trivia.com");

        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));
        var response = updateUseCase.apply(questionDto);

        Assertions.assertEquals(Objects.requireNonNull(response.block()), "2");
        Mockito.verify(questionRepository).save(Mockito.any());
    }
}