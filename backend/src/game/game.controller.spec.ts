import { ArgumentMetadata, UnsupportedMediaTypeException, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { LobbyCreateDto } from "./dtos/lobby.dto";
import { GameController } from "./game.controller";

describe("GameController Unit Tests", () => {
  let gameController: GameController;
  let target: ValidationPipe;
  beforeAll(async () => {
    const ApiServiceProvider = {
      useFactory: () => ({
        createGame: jest.fn(() => []),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
        controllers: [GameController],
    }).compile();

    gameController = app.get<GameController>(GameController);
  });


  it("calling createGame method", () => {
    const dto = new LobbyCreateDto();
    expect(gameController.createGame(dto)).not.toEqual(null);
  })

  describe('validate lobbyCreateDto', () => {
    beforeEach(() => {
        target = new ValidationPipe();
    })
    it('should be rejected', async () => {

        const metadata: ArgumentMetadata = {
            type: 'body',
            metatype: LobbyCreateDto,
            data: ''
        };
        const testObj = {};
        expect(target.transform(testObj, metadata)).to.be.rejected;
    })
  })
});
