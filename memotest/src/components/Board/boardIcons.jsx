import batIcon from '../../assets/bat.svg';
import catIcon from '../../assets/cat.svg';
import dogIcon from '../../assets/dog.svg';
import fishIcon from '../../assets/fish.svg';
import pigIcon from '../../assets/pig.svg';
import deerIcon from '../../assets/deer.svg';
import spiderIcon from '../../assets/spider.svg';

const BoardIcons = [
    batIcon, 
    catIcon, 
    dogIcon, 
    fishIcon, 
    pigIcon, 
    deerIcon, 
    spiderIcon
].flatMap((image) => [image, image]).sort(() => Math.random() - 0.5);

export default BoardIcons;
