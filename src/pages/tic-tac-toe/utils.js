const checkRows = (grid, validSize) => {
        let ans = false;
        for(let i=0; i<validSize; i+=1){
            let curr = false;
            for(let j=2; j<validSize; j+=1){
                if(grid[i][j] === grid[i][j-1] && grid[i][j-1] === grid[i][j-2] && grid[i][j] !== " "){
                    curr = true;
                    break;
                }
            }
            ans = ans || curr;
        }
        return ans;
    }
    const checkCols = (grid, validSize) => {
        let ans = false;
        for(let j=0; j<validSize; j+=1){
            let curr = false;
            for(let i=2; i<validSize; i+=1){
                if(grid[i][j] === grid[i-1][j] && grid[i-1][j] === grid[i-2][j] && grid[i][j] !== " "){
                    curr = true;
                    break;
                }
            }
            ans = ans || curr;
        }
        return ans;
    }
    const checkDias = (grid, validSize) => {
        let ans = false;
        for(let i=0; i<validSize; i+=1){
            let curr = false;
            for(let j=0; j<validSize; j+=1){
                if(i-1>=0 && i-2 >=0 && j-1>=0 && j-2>=0 && grid[i][j] === grid[i-1][j-1] && grid[i-1][j-1] === grid[i-2][j-2] && grid[i][j] !== " "){
                    curr = true;
                    break;
                }
                if(i-1>=0 && i-2>=0 && j+1<validSize && j+2<validSize && grid[i][j] === grid[i-1][j+1] && grid[i][j] === grid[i-2][j+2] && grid[i][j] !== " "){
                    curr = true;
                    break;
                }
            }
            ans = ans || curr; 
        }
        return ans;
    }

    export {checkCols, checkRows, checkDias};