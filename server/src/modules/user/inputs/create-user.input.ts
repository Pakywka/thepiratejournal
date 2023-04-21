import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty({ message: 'Почтовый адрес обязательное поле.' })
  @IsEmail(undefined, { message: 'Не является почтовым адресом.' })
  @Length(5, 32, { message: 'Длина почтового адреса от 5 до 32 символов.' })
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: 'Пароль обязательное поле.' })
  @Length(8, 32, { message: 'Длина пароля от 8 до 32 символов.' })
  password?: string;

  @Field()
  @IsString({ message: 'Никнейм должен быть строкой.' })
  @IsNotEmpty({ message: 'Никнейм обязательное поле.' })
  @Length(3, 16, { message: 'Длина никнейма от 3 до 16 символов.' })
  username: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 16, { message: 'Длина имени от 3 до 16 символов.' })
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(3, 22, { message: 'Длина фамилии от 3 до 22 символов.' })
  lastName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  image?: string;
}