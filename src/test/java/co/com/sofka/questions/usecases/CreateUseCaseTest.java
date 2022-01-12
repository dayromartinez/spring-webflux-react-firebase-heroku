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
class CreateUseCaseTest {

    @MockBean
    private QuestionRepository repository;
    @SpyBean
    private CreateUseCase createUseCase;

    @Test
    void createQuestion(){

        var questionDto = new QuestionDTO(
                "2",
                "¿Por qué te casaste Adonay?",
                "ABIERTA (CAJA GRANDE ABIERTA)",
                "TECNOLOGÍA Y COMPUTACIÓN",
                "djmd96@hotmail.com"
        );

        var question = new Question();
        question.setId("11");
        question.setUserId("2");
        question.setQuestion("¿Por qué te casaste Adonay?");
        question.setType("ABIERTA (CAJA GRANDE ABIERTA)");
        question.setCategory("TECNOLOGÍA Y COMPUTACIÓN");
        question.setEmailUser("djmd96@hotmail.com");

        Mockito.when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));
        var response = createUseCase.apply(questionDto);

        Assertions.assertEquals(Objects.requireNonNull(response.block()), "11");
        Mockito.verify(repository).save(Mockito.any());
    }
}