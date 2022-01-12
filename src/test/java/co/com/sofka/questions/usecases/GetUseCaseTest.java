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

@SpringBootTest
class GetUseCaseTest {

    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    private GetUseCase getUseCase;

    @Test
    void getTest(){

        var question = new Question();
        question.setId("11");
        question.setQuestion("¿Qué es un test?");
        question.setUserId("2");
        question.setType("CON RESULTADOS (CAJA ABIERTA CON LINK)");
        question.setCategory("DESARROLLO DE SOFTWARE");

        Mockito.when(questionRepository.findById(Mockito.anyString())).thenReturn(Mono.just(question));

        var response = getUseCase.apply("11");

        Assertions.assertEquals(response.block().getQuestion(), question.getQuestion());
        Assertions.assertEquals(response.block().getId(), "11");
        Assertions.assertEquals(response.block().getCategory(), question.getCategory());
        Assertions.assertEquals(response.block().getType(), question.getType());
        Assertions.assertEquals(response.block().getUserId(), question.getUserId());
        Mockito.verify(questionRepository).findById(Mockito.anyString());

    }
}