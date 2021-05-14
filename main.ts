namespace SpriteKind {
    export const Customer = SpriteKind.create()
}
/**
 * 0 noting on hand, 1 got food 2 serve food
 */
// down
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (faceDir == 0) {
        grid.move(mySprite, 0, -1)
    }
    mySprite.setImage(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f e e e e f f . . . . 
        . . . f e e e f f e e e f . . . 
        . . f f f f f 2 2 f f f f f . . 
        . . f f e 2 e 2 2 e 2 e f f . . 
        . . f e 2 f 2 f f 2 f 2 e f . . 
        . . f f f 2 2 e e 2 2 f f f . . 
        . f f e f 2 f e e f 2 f e f f . 
        . f e e f f e e e e f e e e f . 
        . . f e e e e e e e e e e f . . 
        . . . f e e e e e e e e f . . . 
        . . e 4 f f f f f f f f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    faceDir = 0
})

controller.up.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 200, function() {
        if (faceDir == 0) {
            grid.move(mySprite, 0, -1)
        }
        mySprite.setImage(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f e e e e f f . . . . 
            . . . f e e e f f e e e f . . . 
            . . f f f f f 2 2 f f f f f . . 
            . . f f e 2 e 2 2 e 2 e f f . . 
            . . f e 2 f 2 f f 2 f 2 e f . . 
            . . f f f 2 2 e e 2 2 f f f . . 
            . f f e f 2 f e e f 2 f e f f . 
            . f e e f f e e e e f e e e f . 
            . . f e e e e e e e e e e f . . 
            . . . f e e e e e e e e f . . . 
            . . e 4 f f f f f f f f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 4 4 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        faceDir = 0
    })

})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    // addNewCustomer()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    spcol = grid.spriteCol(mySprite)
    sprow = grid.spriteRow(mySprite)
    faceCol = spcol
    faceRow = sprow
    if (faceDir == 0) {
        faceRow += -1
    } else if (faceDir == 1) {
        faceRow += 1
    } else if (faceDir == 2) {
        faceCol += -1
    } else {
        faceCol += 1
    }
    // should serve customer or go to trash
    if (state == 1) {
        if (isValideToPlace(faceCol, faceRow)) {
            if (faceCol == 1 && faceRow == 7) {
                state = 2
            } else if (faceCol == 6 && faceRow == 7) {
                state = 2
            } else {
                state = 0
            }
            grid.place(catchFoodsp, tiles.getTileLocation(faceCol, faceRow))
            if (faceRow <= 6) {
                tiles.setWallAt(tiles.getTileLocation(faceCol, faceRow), true)
            }
            if (faceRow <= 4) {
                emptyLoc = faceRow * 10 + faceCol
                storefoodLocations.removeElement(emptyLoc)
            }
        }
    } else {
        faceFoods = grid.getSprites(tiles.getTileLocation(faceCol, faceRow))
        if (faceFoods.length > 0) {
            state = 1
            catchFoodsp = faceFoods[0]
            grid.remove(catchFoodsp)
            catchFoodsp.y += 5
            // faceFoods[0].destroy()
            if (faceRow < 7) {
                tiles.setWallAt(tiles.getTileLocation(faceCol, faceRow), false)
            }
            if (faceRow <= 4) {
                emptyLoc = faceRow * 10 + faceCol
                storefoodLocations.push(emptyLoc)
            }
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (faceDir == 2) {
        grid.move(mySprite, -1, 0)
    }
    mySprite.setImage(img`
        . . . . f f f f f f . . . . . . 
        . . . f 2 f e e e e f f . . . . 
        . . f 2 2 2 f e e e e f f . . . 
        . . f e e e e f f e e e f . . . 
        . f e 2 2 2 2 e e f f f f . . . 
        . f 2 e f f f f 2 2 2 e f . . . 
        . f f f e e e f f f f f f f . . 
        . f e e 4 4 f b e 4 4 e f f . . 
        . . f e d d f 1 4 d 4 e e f . . 
        . . . f d d d d 4 e e e f . . . 
        . . . f e 4 4 4 e e f f . . . . 
        . . . f 2 2 2 e d d 4 . . . . . 
        . . . f 2 2 2 e d d e . . . . . 
        . . . f 5 5 4 f e e f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `)
    faceDir = 2
})

controller.left.onEvent(ControllerButtonEvent.Repeated, function () {

    timer.throttle("action", 200, function() {
        if (faceDir == 2) {
            grid.move(mySprite, -1, 0)
        }
        mySprite.setImage(img`
            . . . . f f f f f f . . . . . . 
            . . . f 2 f e e e e f f . . . . 
            . . f 2 2 2 f e e e e f f . . . 
            . . f e e e e f f e e e f . . . 
            . f e 2 2 2 2 e e f f f f . . . 
            . f 2 e f f f f 2 2 2 e f . . . 
            . f f f e e e f f f f f f f . . 
            . f e e 4 4 f b e 4 4 e f f . . 
            . . f e d d f 1 4 d 4 e e f . . 
            . . . f d d d d 4 e e e f . . . 
            . . . f e 4 4 4 e e f f . . . . 
            . . . f 2 2 2 e d d 4 . . . . . 
            . . . f 2 2 2 e d d e . . . . . 
            . . . f 5 5 4 f e e f . . . . . 
            . . . . f f f f f f . . . . . . 
            . . . . . . f f f . . . . . . . 
            `)
        faceDir = 2
    })

})

scene.onHitWall(SpriteKind.Customer, function (sprite, location) {
    if((sprite as Customer).status == -1) {
        animation.stopAnimation(animation.AnimationTypes.All, sprite);
        sprite.setImage(img`
            . . . . . f f 4 4 f f . . . . .
            . . . . f 5 4 5 5 4 5 f . . . .
            . . . f e 3 3 3 3 3 3 e f . . .
            . . f b 3 3 3 3 3 3 3 3 b f . .
            . . f 3 3 3 3 3 3 3 3 3 3 f . .
            . f 3 3 3 3 3 3 3 3 3 3 3 3 f .
            . f b 3 3 3 3 3 3 3 3 3 3 b f .
            . f b b 3 3 3 3 3 3 3 3 b b f .
            . f b b b b b b b b b b b b f .
            f c b b b b b b b b b b b b c f
            f b b b b b b b b b b b b b b f
            . f c c b b b b b b b b c c f .
            . . e 4 c f f f f f f c 4 e . .
            . . e f b d b d b d b b f e . .
            . . . f f 1 d 1 d 1 d f f . . .
            . . . . . f f b b f f . . . . .
        `);
        grid.place(sprite, tiles.getTileLocation(location.col, location.row+1));
        (sprite as Customer).status = 0;
        (sprite as Customer).isAnimating = false;
        (sprite as Customer).askfood();
        if(location.row + 1 != 11) {
            tiles.setWallAt(tiles.getTileLocation(location.col, location.row+1), true)
        }
    } else if((sprite as Customer).status == 1) {
        if (runstep == 0) {
            //updateCustomersLocation(faceCol == 1 ? 1 : 2)
            tiles.setWallAt(tiles.getTileLocation(location.col-2, location.row), false)
            runstep = 1
            animation.runImageAnimation(
            sprite,
            [img`
                . . . . . f f 4 4 f f . . . . . 
                . . . . f 5 4 5 5 4 5 f . . . . 
                . . . f e 4 5 5 5 5 4 e f . . . 
                . . f b 3 e 4 4 4 4 e 3 b f . . 
                . . f 3 3 3 3 3 3 3 3 3 3 f . . 
                . f 3 3 e b 3 e e 3 b e 3 3 f . 
                . f 3 3 f f e e e e f f 3 3 f . 
                . f b b f b f e e f b f b b f . 
                . f b b e 1 f 4 4 f 1 e b b f . 
                f f b b f 4 4 4 4 4 4 f b b f f 
                f b b f f f e e e e f f f b b f 
                . f e e f b d d d d b f e e f . 
                . . e 4 c d d d d d d c 4 e . . 
                . . e f b d b d b d b b f e . . 
                . . . f f 1 d 1 d 1 d f f . . . 
                . . . . . f f b b f f . . . . . 
                `,img`
                . . . . . . . f f . . . . . . . 
                . . . . . f f 4 4 f f . . . . . 
                . . . . f 5 4 5 5 4 5 f . . . . 
                . . . f e 4 5 5 5 5 4 e f . . . 
                . . f b 3 e 4 4 4 4 e 3 b f . . 
                . f e 3 3 3 3 3 3 3 3 3 3 e f . 
                . f 3 3 e b 3 e e 3 b e 3 3 f . 
                . f b 3 f f e e e e f f 3 b f . 
                f f b b f b f e e f b f b b f f 
                f b b b e 1 f 4 4 f 1 e b b b f 
                . f b b e e 4 4 4 4 4 f b b f . 
                . . f 4 4 4 e d d d b f e f . . 
                . . f e 4 4 e d d d d c 4 e . . 
                . . . f e e d d b d b b f e . . 
                . . . f f 1 d 1 d 1 1 f f . . . 
                . . . . . f f f b b f . . . . . 
                `,img`
                . . . . . f f 4 4 f f . . . . . 
                . . . . f 5 4 5 5 4 5 f . . . . 
                . . . f e 4 5 5 5 5 4 e f . . . 
                . . f b 3 e 4 4 4 4 e 3 b f . . 
                . . f 3 3 3 3 3 3 3 3 3 3 f . . 
                . f 3 3 e b 3 e e 3 b e 3 3 f . 
                . f 3 3 f f e e e e f f 3 3 f . 
                . f b b f b f e e f b f b b f . 
                . f b b e 1 f 4 4 f 1 e b b f . 
                f f b b f 4 4 4 4 4 4 f b b f f 
                f b b f f f e e e e f f f b b f 
                . f e e f b d d d d b f e e f . 
                . . e 4 c d d d d d d c 4 e . . 
                . . e f b d b d b d b b f e . . 
                . . . f f 1 d 1 d 1 d f f . . . 
                . . . . . f f b b f f . . . . . 
                `,img`
                . . . . . . . f f . . . . . . . 
                . . . . . f f 4 4 f f . . . . . 
                . . . . f 5 4 5 5 4 5 f . . . . 
                . . . f e 4 5 5 5 5 4 e f . . . 
                . . f b 3 e 4 4 4 4 e 3 b f . . 
                . f e 3 3 3 3 3 3 3 3 3 3 e f . 
                . f 3 3 e b 3 e e 3 b e 3 3 f . 
                . f b 3 f f e e e e f f 3 b f . 
                f f b b f b f e e f b f b b f f 
                f b b b e 1 f 4 4 f 1 e b b b f 
                . f b b f 4 4 4 4 4 e e b b f . 
                . . f e f b d d d e 4 4 4 f . . 
                . . e 4 c d d d d e 4 4 e f . . 
                . . e f b b d b d d e e f . . . 
                . . . f f 1 1 d 1 d 1 f f . . . 
                . . . . . f b b f f f . . . . . 
                `],
            100,
            true
            )
            sprite.setVelocity(0, 32)
        } else if (runstep == 1) {
            (sprite as Customer).isAnimating = false;
            (sprite as Customer).status = 0;
            (sprite as Customer).disappear();
            runstep = 0
            updateCustomersLocation((sprite as Customer).team)
        }
    }

})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (state == 1) {
        return
    }
    sprite.destroy()
})

controller.right.onEvent(ControllerButtonEvent.Repeated, function () {

    timer.throttle("action", 200, function() {
        if (faceDir == 3) {
            grid.move(mySprite, 1, 0)
        }
        mySprite.setImage(img`
            . . . . . . f f f f f f . . . . 
            . . . . f f e e e e f 2 f . . . 
            . . . f f e e e e f 2 2 2 f . . 
            . . . f e e e f f e e e e f . . 
            . . . f f f f e e 2 2 2 2 e f . 
            . . . f e 2 2 2 f f f f e 2 f . 
            . . f f f f f f f e e e f f f . 
            . . f f e 4 4 e b f 4 4 e e f . 
            . . f e e 4 d 4 1 f d d e f . . 
            . . . f e e e 4 d d d d f . . . 
            . . . . f f e e 4 4 4 e f . . . 
            . . . . . 4 d d e 2 2 2 f . . . 
            . . . . . e d d e 2 2 2 f . . . 
            . . . . . f e e f 4 5 5 f . . . 
            . . . . . . f f f f f f . . . . 
            . . . . . . . f f f . . . . . . 
            `)
        faceDir = 3
    })

})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {

    if (faceDir == 3) {
        grid.move(mySprite, 1, 0)
    }
    mySprite.setImage(img`
        . . . . . . f f f f f f . . . . 
        . . . . f f e e e e f 2 f . . . 
        . . . f f e e e e f 2 2 2 f . . 
        . . . f e e e f f e e e e f . . 
        . . . f f f f e e 2 2 2 2 e f . 
        . . . f e 2 2 2 f f f f e 2 f . 
        . . f f f f f f f e e e f f f . 
        . . f f e 4 4 e b f 4 4 e e f . 
        . . f e e 4 d 4 1 f d d e f . . 
        . . . f e e e 4 d d d d f . . . 
        . . . . f f e e 4 4 4 e f . . . 
        . . . . . 4 d d e 2 2 2 f . . . 
        . . . . . e d d e 2 2 2 f . . . 
        . . . . . f e e f 4 5 5 f . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . f f f . . . . . . 
        `)
    faceDir = 3

})

function addNewCustomer (teamIdx?:number) {
    if(teamIdx) 
        chooseTeam = teamIdx
    else    
        chooseTeam = randint(1, 2)
    if (chooseTeam == 1) {
        if(leftCustomers.length > 3) return
        // left  col = 1, row start 8
        needFoodCnt2 = randint(1, 2)
        genpatient2 = randint(6, 12)
        let genfd2:number[] = []
        for (let index = 0; index < needFoodCnt2; index++) {
            genfd2.push(randint(0, 5))
        }
        let customer = new Customer(img`
            . . . . . f f 4 4 f f . . . . .
            . . . . f 5 4 5 5 4 5 f . . . .
            . . . f e 3 3 3 3 3 3 e f . . .
            . . f b 3 3 3 3 3 3 3 3 b f . .
            . . f 3 3 3 3 3 3 3 3 3 3 f . .
            . f 3 3 3 3 3 3 3 3 3 3 3 3 f .
            . f b 3 3 3 3 3 3 3 3 3 3 b f .
            . f b b 3 3 3 3 3 3 3 3 b b f .
            . f b b b b b b b b b b b b f .
            f c b b b b b b b b b b b b c f
            f b b b b b b b b b b b b b b f
            . f c c b b b b b b b b c c f .
            . . e 4 c f f f f f f c 4 e . .
            . . e f b d b d b d b b f e . .
            . . . f f 1 d 1 d 1 d f f . . .
            . . . . . f f b b f f . . . . .
        `, SpriteKind.Customer,genpatient2,genfd2)
        customer.team = chooseTeam
        grid.place(customer, tiles.getTileLocation(1, 11))
        leftCustomers.push(customer)
        // console.log("cs len:"+leftCustomers.length)
        // console.log("come customer")
    } else {
        if(rightCustomers.length > 3) return
        // right col = 6, row start 8
        needFoodCnt3 = randint(1, 2)
        genpatient3 = randint(6, 12)
        let genfd3:number[] = []
        for (let index = 0; index < needFoodCnt3; index++) {
            genfd3.push(randint(0, 5))
        }
        let customer = new Customer(img`
            . . . . . f f 4 4 f f . . . . .
            . . . . f 5 4 5 5 4 5 f . . . .
            . . . f e 3 3 3 3 3 3 e f . . .
            . . f b 3 3 3 3 3 3 3 3 b f . .
            . . f 3 3 3 3 3 3 3 3 3 3 f . .
            . f 3 3 3 3 3 3 3 3 3 3 3 3 f .
            . f b 3 3 3 3 3 3 3 3 3 3 b f .
            . f b b 3 3 3 3 3 3 3 3 b b f .
            . f b b b b b b b b b b b b f .
            f c b b b b b b b b b b b b c f
            f b b b b b b b b b b b b b b f
            . f c c b b b b b b b b c c f .
            . . e 4 c f f f f f f c 4 e . .
            . . e f b d b d b d b b f e . .
            . . . f f 1 d 1 d 1 d f f . . .
            . . . . . f f b b f f . . . . .
        `, SpriteKind.Customer,genpatient3,genfd3)
        customer.team = chooseTeam
        grid.place(customer, tiles.getTileLocation(6, 11))
        rightCustomers.push(customer)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (faceDir == 1) {
        grid.move(mySprite, 0, 1)
    }
    mySprite.setImage(img`
        . . . . . . f f f f . . . . . . 
        . . . . f f f 2 2 f f f . . . . 
        . . . f f f 2 2 2 2 f f f . . . 
        . . f f f e e e e e e f f f . . 
        . . f f e 2 2 2 2 2 2 e e f . . 
        . . f e 2 f f f f f f 2 e f . . 
        . . f f f f e e e e f f f f . . 
        . f f e f b f 4 4 f b f e f f . 
        . f e e 4 1 f d d f 1 4 e e f . 
        . . f e e d d d d d d e e f . . 
        . . . f e e 4 4 4 4 e e f . . . 
        . . e 4 f 2 2 2 2 2 2 f 4 e . . 
        . . 4 d f 2 2 2 2 2 2 f d 4 . . 
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
        . . . . . f f f f f f . . . . . 
        . . . . . f f . . f f . . . . . 
        `)
    faceDir = 1
})

controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    timer.throttle("action", 200, function() {
        if (faceDir == 1) {
            grid.move(mySprite, 0, 1)
        }
        mySprite.setImage(img`
            . . . . . . f f f f . . . . . . 
            . . . . f f f 2 2 f f f . . . . 
            . . . f f f 2 2 2 2 f f f . . . 
            . . f f f e e e e e e f f f . . 
            . . f f e 2 2 2 2 2 2 e e f . . 
            . . f e 2 f f f f f f 2 e f . . 
            . . f f f f e e e e f f f f . . 
            . f f e f b f 4 4 f b f e f f . 
            . f e e 4 1 f d d f 1 4 e e f . 
            . . f e e d d d d d d e e f . . 
            . . . f e e 4 4 4 4 e e f . . . 
            . . e 4 f 2 2 2 2 2 2 f 4 e . . 
            . . 4 d f 2 2 2 2 2 2 f d 4 . . 
            . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
            . . . . . f f f f f f . . . . . 
            . . . . . f f . . f f . . . . . 
            `)
        faceDir = 1        
    })

})

function isValideToPlace (col: number, row: number) {
    if (col < 0 || col > 9) {
        return false
    }
    if (row <= 6) {
        if (grid.getSprites(tiles.getTileLocation(col, row)).length > 0) {
            return false
        } else {
            return true
        }
    }
    if (row == 7) {
        return true
    }
    return false
}
class Customer extends Sprite {
    private billspbg:Sprite;
    private foodCnt:number
    public team:number
    private isAsking:boolean
    private statusbar:StatusBarSprite
    private wantFoodList:Sprite[] = []
    public status:number
    public isAnimating:boolean
    public animateStartTime:number
    constructor(img: Image,kind:number,public patience:number,
    public wantfood:number[]) {
        super(img)
        super.setKind(kind)
        this.foodCnt = wantfood.length
        this.status = -1
        this.statusbar = statusbars.create(4, patience, StatusBarKind.Health)
        this.statusbar.max = patience
        this.statusbar.positionDirection(CollisionDirection.Left)
        this.statusbar.attachToSprite(this)
        game.currentScene().physicsEngine.addSprite(this);

    }
    
    askfood() {
        if(grid.spriteRow(this) == 8 && !this.isAsking) {
            if(grid.spriteCol(this) == 1 || grid.spriteCol(this) == 6) {
                this.isAsking = true
                if(!this.billspbg) {
                    this.billspbg = sprites.create(assets.image`myImage0`) 
                    this.billspbg.x = this.x + 8 + 24
                    this.billspbg.y = this.y
                }

                
                for(let q = 0; q < this.wantfood.length; q++) {
                    let fdsp = sprites.create(foodlist[this.wantfood[q]], SpriteKind.Food)
                    fdsp.x = this.x+24+18*q
                    fdsp.y = this.y
                    this.wantFoodList.push(fdsp)
                }
            }
        }        
    }

    checkFood(food:number):boolean {
        if(this.status != 0) return false
        if(this.wantfood.indexOf(food) > -1) {
            let rmidx = this.wantfood.indexOf(food)
            let fdsp2 = this.wantFoodList[rmidx]
            fdsp2.destroy()
            this.wantFoodList.removeAt(rmidx)
            this.wantfood.removeAt(rmidx)//removeElement(food)
            if(this.wantfood.length == 0) {
                this.status = 1
                info.changeScoreBy(this.foodCnt*5)
            }
            return true
        } else {
            this.patience-=2;
            this.statusbar.value = this.patience
            if(this.patience<=0) {
                this.status = 2;
            }
            return false
        }
    }

    angryLeave() {
        this.statusbar.destroy()
        if(this.billspbg)
            this.billspbg.destroy()
        for(let r = 0; r < this.wantFoodList.length; r++) {
            let fdsp22 = this.wantFoodList[r]
            fdsp22.destroy()
        }
        animation.runImageAnimation(
        this,
        assets.animation`myAnim`,
        200,
        false
        )
    }

    runAnimation() {
        if(this.status == 2) {
            if(this.isAnimating) {
                if(game.runtime() - this.animateStartTime >= 1000) {
                    this.isAnimating = false
                    animation.stopAnimation(animation.AnimationTypes.All, this)
                    this.status = 0
                    scene.cameraShake(4, 500)
                    this.disappear()
                    info.changeLifeBy(-1)
                    

                    tiles.setWallAt(grid.getLocation(this), false)
                    //updateCustomersLocation(this.team)
                }
            } else {
                this.angryLeave()
                this.isAnimating = true
                this.animateStartTime = game.runtime()
            }
        }
        if(this.status == 1) {
            if(this.isAnimating) {
                
            } else {
                this.leaveStore()
                this.isAnimating = true
            }
        }
        if(this.status == -1) {
            if(this.isAnimating) {
                
            } else {
                this.goForward()
                this.isAnimating = true
            }
            
        }
    }

    goForward() {
        animation.runImageAnimation(
        this,
        [img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 3 3 3 3 3 3 e f . . . 
            . . f b 3 3 3 3 3 3 3 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 3 f . 
            . f b 3 3 3 3 3 3 3 3 3 3 b f . 
            . f b b 3 3 3 3 3 3 3 3 b b f . 
            . f b b b b b b b b b b b b f . 
            f c b b b b b b b b b b b b c f 
            f b b b b b b b b b b b b b b f 
            . f c c b b b b b b b b c c f . 
            . . e 4 c f f f f f f c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 3 3 3 3 3 3 e f . . . 
            . . f b 3 3 3 3 3 3 3 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f b 3 3 3 3 3 3 3 3 3 3 b f . 
            . f b b 3 3 3 3 3 3 3 3 b b f . 
            . f b b b b b b b b b b b b f . 
            f c b b b b b b b b b b b b f . 
            f b b b b b b b b b b b b c f . 
            f f b b b b b b b b b b c f . . 
            . f c c c f f f f f f f e c . . 
            . . . f b b d b d d e 4 4 e . . 
            . . . f f 1 1 d 1 d e e f . . . 
            . . . . . f b b f f f . . . . . 
            `,img`
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 3 3 3 3 3 3 e f . . . 
            . . f b 3 3 3 3 3 3 3 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f 3 3 3 3 3 3 3 3 3 3 3 3 f . 
            . f b 3 3 3 3 3 3 3 3 3 3 b f . 
            . f b b 3 3 3 3 3 3 3 3 b b f . 
            . f b b b b b b b b b b b b f . 
            f c b b b b b b b b b b b b c f 
            f b b b b b b b b b b b b b b f 
            . f c c b b b b b b b b c c f . 
            . . e 4 c f f f f f f c 4 e . . 
            . . e f b d b d b d b b f e . . 
            . . . f f 1 d 1 d 1 d f f . . . 
            . . . . . f f b b f f . . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . f f 4 4 f f . . . . . 
            . . . . f 5 4 5 5 4 5 f . . . . 
            . . . f e 3 3 3 3 3 3 e f . . . 
            . . f b 3 3 3 3 3 3 3 3 b f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . f b 3 3 3 3 3 3 3 3 3 3 b f . 
            . f b b 3 3 3 3 3 3 3 3 b b f . 
            . f b b b b b b b b b b b b f . 
            . f b b b b b b b b b b b b c f 
            . f c b b b b b b b b b b b b f 
            . . f c b b b b b b b b b b f f 
            . . c e f f f f f f f c c c f . 
            . . e 4 4 e d d b d b b f . . . 
            . . . f e e d 1 d 1 1 f f . . . 
            . . . . . f f f b b f . . . . . 
            `],
        200,
        true
        )
        this.setVelocity(0, -32)
    }

    leaveStore() {
        this.statusbar.destroy()
        this.billspbg.destroy()
        for(let r = 0; r < this.wantFoodList.length; r++) {
            let fdsp22 = this.wantFoodList[r]
            fdsp22.destroy()
        }
        this.setImage(img`
            . . . . . . f f f f 4 4 f . . .
            . . . . f f b f 5 4 5 5 4 f . .
            . . . f b 3 3 e 4 5 5 5 5 f . .
            . . f b 3 3 3 3 e 4 4 4 e f . .
            . . f 3 3 3 3 3 3 3 3 3 3 f . .
            . . f 3 3 3 3 e b 3 e e 3 3 f .
            . . f 3 3 3 3 f f e e e 3 3 f .
            . . f b b b b f b f e e e 3 f .
            . . f b b b b e 1 f 4 4 e f . .
            . f f b b b b f 4 4 4 4 f . . .
            . f b b b b f f f e e e f . . .
            . . f b b f 4 4 e d d d f . . .
            . . . f f e 4 4 e d d d f . . .
            . . . . f b e e b d b d b f . .
            . . . . f f d 1 d 1 d 1 f f . .
            . . . . . . f f b b f f . . . .
        `)
        
        animation.runImageAnimation(
        this,
        [img`
            . . . . . . f f f f 4 4 f . . . 
            . . . . f f b f 5 4 5 5 4 f . . 
            . . . f b 3 3 e 4 5 5 5 5 f . . 
            . . f b 3 3 3 3 e 4 4 4 e f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 f . . 
            . . f 3 3 3 3 e b 3 e e 3 3 f . 
            . . f 3 3 3 3 f f e e e 3 3 f . 
            . . f b b b b f b f e e e 3 f . 
            . . f b b b b e 1 f 4 4 e f . . 
            . f f b b b b f 4 4 4 4 f . . . 
            . f b b b b f f f e e e f . . . 
            . . f b b f 4 4 e d d d f . . . 
            . . . f f e 4 4 e d d d f . . . 
            . . . . f b e e b d b d b f . . 
            . . . . f f d 1 d 1 d 1 f f . . 
            . . . . . . f f b b f f . . . . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f 4 4 f . . . 
            . . . . f f b f 5 4 5 5 4 f . . 
            . . . f b 3 3 e 4 5 5 5 5 f . . 
            . . f b 3 3 3 3 e 4 4 4 e f . . 
            . . f 3 3 3 3 3 3 3 3 3 3 3 f . 
            . . f 3 3 3 3 e b 3 e e 3 3 f . 
            . . f 3 3 3 3 f f e e e 3 3 f . 
            . f f b b b b f b f e e e f . . 
            . f b b b b b e 1 f 4 4 e . . . 
            . f b b b b b f 4 4 4 4 f . . . 
            . . f b b b 4 4 e d d d f . . . 
            . . . f f f 4 4 e d d d f . . . 
            . . . f b b e e b b d d d f . . 
            . . . . f b d d 1 d 1 d b f . . 
            . . . . . f f f b b f f f . . . 
            `],
        100,
        true
        )
        this.setVelocity(32, 0)
    }

    waitForFood() {
        if(this.status == 2) return
        this.patience-=0.2;
        this.statusbar.value = this.patience
        if(this.patience<=0) {
            this.status = 2;
        }
    }

    disappear() {
        this.destroy()
        if(this.billspbg)
            this.billspbg.destroy()
        for(let s = 0; s < this.wantFoodList.length; s++) {
            let fdsp23 = this.wantFoodList[s]
            fdsp23.destroy()
        }

        //tiles.setWallAt(tiles.getTileLocation(this.col, this.row), false)
    }
}
let seq2 = 0
let putRandom2 = 0
let csm7: Customer[] = []
let foodimage: Image = null
let genpatient3 = 0
let needFoodCnt3 = 0
let genpatient2 = 0
let needFoodCnt2 = 0
let chooseTeam = 0
let genpatient = 0
let needFoodCnt = 0
let runstep = 0
let emptyLoc = 0
let faceFoods: Sprite[] = []
let faceRow = 0
let sprow = 0
let spcol = 0
let csm2: Customer = null
let radcol = 0
let radrow = 0
let seq = 0
let putRandom = 0
let mySprite: Sprite = null
let storefoodLocations: number[] = []
let faceDir = 0
let rightCustomers:Customer[] = []
let leftCustomers:Customer[] = []
let faceCol = 0
let state = 0
let genfd:number[] = []
let rowMax = 10
let catchFoodsp:Sprite
faceDir = 1
function shuffle(array:number[]) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
for (let o = 0; o <= 49; o++) {
    storefoodLocations.push(o)
}
// storefoodLocations = shuffle(storefoodLocations)
game.setDialogFrame(img`
    999999999999999999999999999999999999999999999999
    999999999999999999999999999999999999999999999999
    999911119999119991111999111199999999119999999999
    999111111191111911111191111119911191111991111999
    999111111111111111111111111111111111111911111199
    999111111111111111111111111111111111111111111199
    999111111111111111111111111111111111111111111199
    999911111111111111111111111111111111111111111199
    999991111111111111111111111111111111111111111999
    999111111111111111111111111111111111111111111999
    991111111111111111111111111111111111111111119999
    991111111111111111111111111111111111111111111999
    999111111111111111111111111111111111111111111199
    999911111111111111111111111111111111111111111199
    999111111111111111111111111111111111111111111999
    999111111111111111111111111111111111111111119999
    999111111111111111111111111111111111111111111999
    999911111111111111111111111111111111111111111199
    999911111111111111111111111111111111111111111199
    999111111111111111111111111111111111111111111199
    991111111111111111111111111111111111111111111199
    991111111111111111111111111111111111111111111999
    991111111111111111111111111111111111111111119999
    991111111111111111111111111111111111111111111999
    999111111111111111111111111111111111111111111199
    999911111111111111111111111111111111111111111199
    999111111111111111111111111111111111111111111199
    991111111111111111111111111111111111111111111199
    991111111111111111111111111111111111111111111999
    991111111111111111111111111111111111111111119999
    991111111111111111111111111111111111111111119999
    999111111111111111111111111111111111111111111999
    99d1111111111111111111111111111111111dd111111199
    9ddd111111111111111111111111111111111dd111111199
    9ddd1111111111dd111111111111111111111dd1111dd199
    9d1d111111111ddddd11111111111ddddd111ddd111ddd99
    9ddd111ddd111d111d1111ddddd11d111d11dddd111ddd99
    9d1d11ddddd11ddddd1111ddddd11ddddd11d1dd111ddd99
    9ddd11d1d1d11d111d1dd1d1ddd11d111d11dddddddddd99
    9d1d11ddddd11ddddd1dd1ddd1d11ddddddddd1ddd111ddd
    dddd11d1d1d11d111d1dd1ddddd11d111ddddddddddddddd
    dd1d1ddddddddddddd1dd1d1ddddddddddddd1dddd111ddd
    dddd1dd1d1dddd111dddddddd1dddd111ddddddddddddddd
    dd1d1ddddddddddddddddddddddddddddddddd1ddd111ddd
    ddddddddddddddddddddddd1dddddddddddddddddddddddd
    ddddddddddddddddddddddddd1ddddddddddd1dddd111ddd
    .dddddddddddddddddddddddddddddddddddddddddddddd.
    ..dddddddddddddddddddddddddddddddddddddddddddd..
    `)
game.showLongText("Move your sprite to find the food that the customers need, and click button A to pick up the food.", DialogLayout.Full)
game.showLongText("Send food to the pick-up point in front of the customer, face to the customer and click button A to put down the food. ", DialogLayout.Full)
game.showLongText("You need deliver correct food to the customer as soon as possible.", DialogLayout.Full)
let initFoodStoreCnt = 10
let curFoodNum = -1
let currentFoodStoreCnt = initFoodStoreCnt
let foodlist = [
sprites.food.smallBurger,
sprites.food.smallDrumstick,
sprites.food.smallHam,
sprites.food.smallPizza,
sprites.food.smallDonut,
sprites.food.smallCake
]
tiles.setTilemap(tilemap`level1`)
mySprite = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.Customer)
// tiles.placeOnTile(mySprite, tiles.getTileLocation(4, 6))
grid.place(mySprite, tiles.getTileLocation(4, 6))
let trashcan = sprites.create(assets.image`myImage3`, SpriteKind.Enemy)
tiles.placeOnTile(trashcan, tiles.getTileLocation(9, 5))
grid.moveWithButtons(mySprite)
scene.centerCameraAt(0, 120)
scene.cameraFollowSprite(mySprite)

info.setLife(5)
info.setScore(0)
//game.consoleOverlay.setVisible(true)

sprites.onDestroyed(SpriteKind.Customer, function (sprite) {
    if((sprite as Customer).team == 1) {
        leftCustomers.removeElement((sprite as Customer))
    } else {
        rightCustomers.removeElement((sprite as Customer))
    }
	updateCustomersLocation((sprite as Customer).team)

})
for (let p = 0; p <= initFoodStoreCnt - 1; p++) {
    let foodsprite = sprites.create(foodlist[randint(0, 5)], SpriteKind.Food)
    putRandom = randint(0, storefoodLocations.length - 1)
    seq = storefoodLocations[putRandom]
    radrow = Math.floor(seq / 10)
    radcol = seq % 10
    grid.place(foodsprite, tiles.getTileLocation(radcol, radrow))
    tiles.setWallAt(tiles.getTileLocation(radcol, radrow), true)
    storefoodLocations.removeAt(putRandom)
}

function updateCustomersLocation(team?:number) {
    if(team == 1) {
        for(let t = 0; t < 3; t++) {
            tiles.setWallAt(tiles.getTileLocation(1, 8+t), false)
        }
        for(let t = 0; t < leftCustomers.length; t++) {
            let csm3  = leftCustomers[t]
            if(t > 0) {
                tiles.setWallAt(tiles.getTileLocation(1, 8+t), false)
            }
            if(csm3.status == 0)
                csm3.status = -1
        }
    } else if(team == 2) {
        for(let t = 0; t < 3; t++) {
            tiles.setWallAt(tiles.getTileLocation(6, 8+t), false)
        }
        for(let u = 0; u < rightCustomers.length; u++) {
            let csm4  = rightCustomers[u]
            if(u > 0) {
                tiles.setWallAt(tiles.getTileLocation(6, 8+u), false)
            }
            if(csm4.status == 0)
                csm4.status = -1
        }
    } 

}
game.onUpdate(function () {
    if (catchFoodsp && state == 1) {
        catchFoodsp.x = mySprite.x
        catchFoodsp.y = mySprite.y - 10
    }
    for (let v = 0; v <= leftCustomers.length - 1; v++) {
        let csm5 = leftCustomers[v]
        csm5.runAnimation()
    }
    for (let w = 0; w <= rightCustomers.length - 1; w++) {
        let csm6 = rightCustomers[w]
        csm6.runAnimation()
        
    }
    if (state == 2) {
        foodimage = grid.getSprites(tiles.getTileLocation(faceCol, faceRow))[0].image
        if (foodimage.equals(sprites.food.smallBurger)) {
            curFoodNum = 0
        } else if (foodimage.equals(sprites.food.smallDrumstick)) {
            curFoodNum = 1
        } else if (foodimage.equals(sprites.food.smallHam)) {
            curFoodNum = 2
        } else if (foodimage.equals(sprites.food.smallPizza)) {
            curFoodNum = 3
        } else if (foodimage.equals(sprites.food.smallDonut)) {
            curFoodNum = 4
        } else {
            curFoodNum = 5
        }
        csm7 = grid.getSprites(tiles.getTileLocation(faceCol, faceRow + 1)) as Customer[]
        if (csm7.length > 0) {
            let take = (csm7[0] as Customer).checkFood(curFoodNum)
            if (take) {
                grid.getSprites(tiles.getTileLocation(faceCol, faceRow))[0].destroy()
            }
        }
        state = 0
    }
})

game.onUpdateInterval(4000, function () {
    if (storefoodLocations.length == 0) {
        game.over(false)
    } else {
        putRandom2 = randint(0, storefoodLocations.length - 1)
        seq2 = storefoodLocations[putRandom2]
        radrow = Math.floor(seq2 / 10)
        radcol = seq2 % 10
        // player in this place not play food now
        if (radcol == grid.spriteCol(mySprite) && radrow == grid.spriteRow(mySprite)) {
        	
        } else {
            let foodsprite = sprites.create(foodlist[randint(0, 5)], SpriteKind.Food)
            grid.place(foodsprite, tiles.getTileLocation(radcol, radrow))
            tiles.setWallAt(tiles.getTileLocation(radcol, radrow), true)
            storefoodLocations.removeAt(putRandom2)
        }
    }

})
game.onUpdateInterval(1000, function () {
    
    if (Math.percentChance(50)) {
        addNewCustomer()
    }
    for(let i = 0 ; i < leftCustomers.length;i++) {
        let csm  = leftCustomers[i]
        if(i < 2 && csm.status == 0)
            csm.waitForFood()
    }
    for(let i = 0 ; i < rightCustomers.length;i++) {
        let csm  = rightCustomers[i]
        if(i < 2 && csm.status == 0)
            csm.waitForFood()
    }
})
