import {
    ArcRotateCamera,
    Scene,
    Collider,
    Engine,
    HemisphericLight,
    Vector3,
    MeshBuilder,
    Nullable, Mesh, Color3, Color4
} from "@babylonjs/core";

class ObjectBehaviour implements IBehaviour {
    constructor() {

    }

    Awake(): void {
    }

    FixedUpdate(): void {
    }

    LateUpdate(): void {
    }

    OnAnimatorIK(): void {
    }

    OnAnimatorMove(): void {
    }

    OnApplicationFocus(focus: boolean): void {
    }

    OnApplicationPause(pause: boolean): void {
    }

    OnApplicationQuit(): void {
    }

    OnBecameInvisible(): void {
    }

    OnBecameVisible(): void {
    }

    OnCollisionEnter(other: Collider): void {
    }

    OnCollisionExit(other: Collider): void {
    }

    OnCollisionStay(other: Collider): void {
    }

    OnDestroy(): void {
    }

    OnDisable(): void {
    }

    OnEnable(): void {
    }

    OnLevelWasLoaded(level: number): void {
    }

    OnMouseDown(): void {
    }

    OnMouseDrag(): void {
    }

    OnMouseEnter(): void {
    }

    OnMouseExit(): void {
    }

    OnMouseOver(): void {
    }

    OnMouseUp(): void {
    }

    OnPostRender(): void {
    }

    OnPreCull(): void {
    }

    OnPreRender(): void {
    }

    OnRenderObject(): void {
    }

    OnTransformChildrenChanged(): void {
    }

    OnTransformFocused(): void {
    }

    OnTransformHierarchyChanged(): void {
    }

    OnTransformNameChanged(): void {
    }

    OnTransformParentChanged(): void {
    }

    OnTransformPositionChanged(): void {
    }

    OnTransformRotationChanged(): void {
    }

    OnTransformScaleChanged(): void {
    }

    OnTransformUpdated(): void {
    }

    OnTriggerEnter(other: Collider): void {
    }

    OnTriggerExit(other: Collider): void {
    }

    OnTriggerStay(other: Collider): void {
    }

    Start(): void {
    }

    Update(): void {
    }

    animation: Animation;
    collider: Collider;
    enabled: boolean;
    isKinematic: boolean;
    isStatic: boolean;
    isTrigger: boolean;
    name: string;
    tag: string;
}

interface IBehaviour {
    //define IBehaviour properties from Unity to Babylon.js
    name: string;
    enabled: boolean;
    //gameObject: GameObject;
    //transform: Transform;
    tag: string;
    isStatic: boolean;
    isKinematic: boolean;
    isTrigger: boolean;
    //rigidbody: Rigidbody;
    //rigidbody2D: Rigidbody2D;
    collider: Collider;
    //collider2D: Collider2D;
    //animator: Animator;
    animation: Animation;
    //audio: AudioSource;
    //guiText: GUIText;
    //guiTexture: GUITexture;
    //networkView: NetworkView;
    //particleEmitter: ParticleEmitter;
    //particleSystem: ParticleSystem;
    //renderer: Renderer;

    //common functions
    Awake(): void;
    Start():void;
    FixedUpdate():void;
    LateUpdate():void;
    Update():void;
    OnEnable():void;
    OnDisable():void;
    OnDestroy():void;
    OnBecameVisible():void;
    OnBecameInvisible():void;
    OnApplicationQuit():void;
    OnApplicationFocus(focus:boolean):void;
    OnApplicationPause(pause:boolean):void;
    OnLevelWasLoaded(level:number):void;

    //Animation functions
    OnAnimatorIK():void;
    OnAnimatorMove():void;

    //Physics functions
    OnTriggerEnter(other:Collider):void;
    OnTriggerExit(other:Collider):void;
    OnCollisionEnter(other:Collider):void;
    OnCollisionExit(other:Collider):void;
    OnCollisionStay(other:Collider):void;
    OnTriggerStay(other:Collider):void;

    //Mouse functions
    OnMouseDown():void;
    OnMouseUp():void;
    OnMouseEnter():void;
    OnMouseExit():void;
    OnMouseOver():void;
    OnMouseDrag():void;

    //Render functions
    OnPreCull():void;
    OnPreRender():void;
    OnPostRender():void;
    OnRenderObject():void;
    //OnRenderImage(source:RenderTexture, destination:RenderTexture):void;

    //Transform functions
    OnTransformChildrenChanged():void;
    OnTransformParentChanged():void;
    OnTransformFocused():void;
    OnTransformHierarchyChanged():void;
    OnTransformNameChanged():void;
    OnTransformParentChanged():void;
    OnTransformPositionChanged():void;
    OnTransformRotationChanged():void;
    OnTransformScaleChanged():void;
    OnTransformUpdated():void;
    OnTransformChildrenChanged():void;
}

//create a 2D Snake game using Babylon.js
class Snake {
    private _scene: Scene;
    private _camera: ArcRotateCamera;
    private _light: HemisphericLight;
    private _engine: Engine;
    private _snake: Mesh;
    private _food: Mesh;
    private _foodPosition: Vector3;
    private _foodEaten: boolean;
    private _direction: Vector3;
    private _movementSpeed: number;
    private _movementStep: number;
    private _movementSteps: number;
    private _movementStepsMax: number;
    private _movementStepsMin: number;
    private _movementStepsCurrent: number;
    private _movementStepsCurrentMax: number;
    private _movementStepsCurrentMin: number;
    private _movementStepsCurrentMaxMin: number;
    private _movementStepsCurrentMinMax: number;
    private _movementStepsCurrentMaxMinMax: number;
    private _movementStepsCurrentMinMaxMax: number;

    constructor() {
        this._scene = new Scene(new Engine(document.getElementById("renderCanvas") as HTMLCanvasElement, 1024, 768, true, {
            preserveDrawingBuffer: true,
            stencil: true
        }));
        this._scene.clearColor = new Color4(0, 0, 0, 1);
        this._scene.autoClear = true;
        this._scene.autoClearDepthAndStencil = true;
        this._scene.autoClearColor = true;
        this._scene.autoClearDepth = true;
        this._scene.autoClearStencil = true;

        this._camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3(0, 0, 0), this._scene);
        this._camera.setPosition(new Vector3(0, 0, -10));
        this._camera.lowerRadiusLimit = 0;
        this._camera.upperRadiusLimit = 10;
        this._camera.wheelPrecision = 100;
        this._camera.inertia = 0;
        this._camera.panningSensibility = 0;
        this._camera.pinchPrecision = 0;
        this._camera.pinchDeltaPercentage = 0;
        this._camera.lowerBetaLimit = 0;
        this._camera.upperBetaLimit = 0;
        this._camera.lowerRadiusLimit = 0;
        this._camera.upperRadiusLimit = 0;
        this._camera.panningSensibility = 0;
        this._camera.pinchPrecision = 0;
        this._camera.pinchDeltaPercentage = 0;
        this._camera.lowerAlphaLimit = 0;
        this._camera.upperAlphaLimit = 0;
        this._camera.angularSensibilityX = 0;
        this._camera.angularSensibilityY = 0;
        this._camera.angularSensibilityZ = 0;
        this._camera.panningSensibility = 0;
        this._camera.pinchPrecision = 0;
        this._camera.pinchDeltaPercentage = 0;
        this._camera.lowerBetaLimit = 0;
    }

    public Start(): void {
        this._engine = new Engine(document.getElementById("renderCanvas") as HTMLCanvasElement, true);
        this._scene = new Scene(this._engine);
        this._scene.clearColor = new Color4(0, 0, 0, 1);
        this._camera = new ArcRotateCamera("Camera", 0, 0, 0, new Vector3(0, 0, 0), this._scene);
        this._camera.setPosition(new Vector3(0, 0, -10));
        this._camera.attachControl(this._engine.getRenderingCanvas());
        this._light = new HemisphericLight("light1", new Vector3(0, 1, 0), this._scene);
        this._light.intensity = 0.7;
        this._foodEaten = false;
        this._movementSpeed = 0.1;
        this._movementStep = 0.1;
        this._movementSteps = 0;
        this._movementStepsMax = 10;
        this._movementStepsMin = 1;
        this._movementStepsCurrent = 0;
        this._movementStepsCurrentMax = 0;
        this._movementStepsCurrentMin = 0;
        this._movementStepsCurrentMaxMin = 0;
        this._movementStepsCurrentMinMax = 0;
        this._movementStepsCurrentMaxMinMax = 0;
        this._movementStepsCurrentMinMaxMax = 0;
        this._direction = new Vector3(0, 0, 0);
        this._foodPosition = new Vector3(0, 0, 0);
        this._snake = this.CreateSnake();
        this._food = this.CreateFood();
        this._scene.registerBeforeRender(() => {
            this.Update();
        });
    }

    private CreateSnake(): Mesh {
        var snake = new Mesh("snake", this._scene);
        var snakeMaterial = new StandardMaterial("snakeMaterial", this._scene);
        snakeMaterial.diffuseColor = new Color3(0, 1, 0);
        snake.material = snakeMaterial;
        snake.position = new Vector3(0, 0, 0);
        snake.scaling = new Vector3(0.5, 0.5, 0.5);
        snake.isVisible = true;
        return snake;
    }

    private CreateFood(): Mesh {
        var food = new Mesh("food", this._scene);
        var foodMaterial = new StandardMaterial("foodMaterial", this._scene);
        foodMaterial.diffuseColor = new Color3(1, 0, 0);
        food.material = foodMaterial;
        food.position = new Vector3(0, 0, 0);
        food.scaling = new Vector3(0.5, 0.5, 0.5);
        food.isVisible = true;
        return food;
    }

    private Update(): void {
        if (this._foodEaten) {
            this._foodEaten = false;
            this._foodPosition = new Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, 0);
            this._food.position = this._foodPosition;
        }
        this._movementStepsCurrent++;
        if (this._movementStepsCurrent > this._movementStepsCurrentMax) {
            this._movementStepsCurrent = 0;
            this._movementStepsCurrentMax = this._movementStepsMax;
            this._movementStepsCurrentMin = this._movementStepsMin;
            this._movementStepsCurrentMaxMin = this._movementStepsMax - this._movementStepsMin;
            this._movementStepsCurrentMinMax = this._movementStepsMin + this._movementStepsMax;
            this._movementStepsCurrentMaxMinMax = this._movementStepsMax - this._movementStepsMin - this._movementStepsMax;
            this._movementStepsCurrentMinMaxMax = this._movementStepsMin + this._movementStepsMax + this._movementStepsMax;
        }
        if (this._movementStepsCurrent < this._movementStepsCurrentMin) {
            this._movementStepsCurrent = 0;
            this._movementStepsCurrentMax = this._movementStepsMax;
            this._movementStepsCurrentMin = this._movementStepsMin;
            this._movementStepsCurrentMaxMin = this._movementStepsMax - this._movementStepsMin;
            this._movementStepsCurrentMinMax = this._movementStepsMin + this._movementStepsMax;
            this._movementStepsCurrentMaxMinMax = this._movementStepsMax - this._movementStepsMin - this._movementStepsMax;
            this._movementStepsCurrentMinMaxMax = this._movementStepsMin + this._movementStepsMax + this._movementStepsMax;
        }
        this._snake.position = this._snake.position.add(this._direction.scale(this._movementSpeed));
        if (this._snake.position.x > 5) {
            this._snake.position.x = -5;
        }
        if (this._snake.position.x < -5) {
            this._snake.position.x = 5;
        }
        if (this._snake.position.y > 5) {
            this._snake.position.y = -5;
        }
        if (this._snake.position.y < -5) {
            this._snake.position.y = 5;
        }
        if (this._snake.position.x == this._foodPosition.x && this._snake.position.y == this._foodPosition.y) {
            this._foodEaten = true;
            this._movementSteps++;
            if (this._movementSteps > this._movementStepsMax) {
                this._movementSteps = this._movementStepsMax;
            }
            if (this._movementSteps < this._movementStepsMin) {
                this._movementSteps = this._movementStepsMin;
            }
        }
    }

    public UpdateDirection(direction: Vector3): void {
        this._direction = direction;
    }

    public GetDirection(): Vector3 {
        return this._direction;
    }

    public GetMovementSpeed(): number {
        return this._movementSpeed;
    }

    public GetMovementStep(): number {
        return this._movementStep;
    }
}