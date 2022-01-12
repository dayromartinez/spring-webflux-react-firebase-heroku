package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;


@SpringBootTest
class DeleteUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @SpyBean
    DeleteUseCase deleteUseCase;

    @Test
    void deleteAnswerTest(){

        var questionDto = new QuestionDTO("1", "11", "2", "¿Qué es un test?", "DESARROLLO DE SOFTWARE","Benito testeador","testeandoando@test.com","www.test.com");

        Mockito.when(questionRepository.deleteById(questionDto.getId())).thenReturn(Mono.empty());

        var response = deleteUseCase.apply(questionDto.getId()).thenReturn(Mono.empty());

        Assertions.assertEquals(response.block(), Mono.empty());
        Mockito.verify(questionRepository).deleteById(questionDto.getId());
    }
}