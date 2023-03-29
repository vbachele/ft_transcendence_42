import React from 'react'
import * as S from './Versus.style'

const Versus = () => {
  return (
    <S.intro>
        <S.sides>
        <S.side className="side firstPlayer">
                    <S.playerName>Lraffin</S.playerName>
                    <img src="https://media.licdn.com/dms/image/D4E35AQHrJvfctpRe2A/profile-framedphoto-shrink_800_800/0/1676031149718?e=1680649200&v=beta&t=9M-196zNW3glwQhwVLTuS9hmJUUS83YQ8jRnIqjyxQ0" className="emoji"></img>
            </S.side>
        <S.versusCircle className='versusCircle span'>
            <span className='span'>VS</span>
        </S.versusCircle>
        <S.side className="side secondPlayer">
            <S.playerName>vbachele</S.playerName>
            <img src="https://cdn.discordapp.com/attachments/1067488107827576916/1087761609969127434/image-2.png" className="emoji"></img>
        </S.side>
    </S.sides>
</S.intro>
  )
}

export default Versus
